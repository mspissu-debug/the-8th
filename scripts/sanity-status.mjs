import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const studioUrl = process.env.PUBLIC_SANITY_STUDIO_URL || 'https://the8-ibrido.sanity.studio';
const readToken = process.env.SANITY_API_READ_TOKEN;
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

function ok(label, pass, detail = '') {
	console.log(`${pass ? '✓' : '✗'} ${label}${detail ? ` — ${detail}` : ''}`);
}

if (!projectId) {
	console.error('Manca PUBLIC_SANITY_PROJECT_ID in .env');
	process.exit(1);
}

ok('Project ID', true, projectId);
ok('Dataset', true, dataset);
ok('READ token (.env)', Boolean(readToken));
ok('WRITE token (.env)', Boolean(writeToken));

const publicClient = createClient({
	projectId,
	dataset,
	apiVersion: '2025-06-15',
	useCdn: false
});

const authClient = createClient({
	projectId,
	dataset,
	apiVersion: '2025-06-15',
	useCdn: false,
	token: readToken || writeToken
});

try {
	const publicCount = await publicClient.fetch('count(*[_type in ["mentor","talent"]])');
	ok('Lettura pubblica (senza token)', publicCount > 0, `${publicCount} documenti`);
} catch (err) {
	ok('Lettura pubblica (senza token)', false, err.message);
}

if (readToken || writeToken) {
	const mentors = await authClient.fetch(
		`*[_type=="mentor"]{name,"slug":slug.current,"hasPortrait":defined(portrait.asset)}`
	);
	const talents = await authClient.fetch(
		`*[_type=="talent"]{name,"slug":slug.current,"hasPortrait":defined(portrait.asset),"concept":count(concept),"sketch":count(sketch),"finished":count(finished)}`
	);

	ok('Mentor in Sanity', mentors.length === 4, `${mentors.length}/4`);
	ok('Talenti in Sanity', talents.length === 4, `${talents.length}/4`);

	const mentorsWithPhoto = mentors.filter((m) => m.hasPortrait).length;
	const talentsWithPhoto = talents.filter((t) => t.hasPortrait).length;
	ok('Mentor con ritratto', mentorsWithPhoto === 4, `${mentorsWithPhoto}/4`);
	ok('Talenti con ritratto', talentsWithPhoto === 4, `${talentsWithPhoto}/4`);

	const talentsWithWorks = talents.filter((t) => (t.concept || 0) + (t.sketch || 0) + (t.finished || 0) > 0)
		.length;
	ok('Talenti con gallerie', talentsWithWorks === 4, `${talentsWithWorks}/4`);
} else {
	console.log('→ Aggiungi SANITY_API_READ_TOKEN per il controllo dettagliato.');
}

try {
	const res = await fetch(studioUrl, { method: 'HEAD', redirect: 'follow' });
	ok('Studio online', res.ok, studioUrl);
} catch {
	ok('Studio online', false, `${studioUrl} (non ancora pubblicato)`);
}

console.log('\nProssimi passi:');
if (!readToken) console.log('1. Crea token Viewer e aggiungi SANITY_API_READ_TOKEN in .env + Vercel');
console.log('2. cd studio && npx sanity login && npm run deploy');
console.log('3. Carica ritratto e gallerie in Sanity Studio');
