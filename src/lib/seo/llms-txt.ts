import { SITE_URL } from '$lib/seo';
import { mentorRole } from '$lib/data/mentors.js';
import { siteLinks } from '$lib/data/site-links.js';

/** @param {import('$lib/data/mentors.js').mentors} mentors @param {import('$lib/data/showcase-registry.js').getBuiltinShowcases extends () => infer R ? R[number][] : never[]} showcases */
export function buildLlmsTxt(mentors, showcases) {
	const base = SITE_URL.replace(/\/$/, '');

	const talentBlocks = showcases
		.map((s) => {
			const pitch = (s.pitchIt ?? s.pitch ?? '').replace(/\s+/g, ' ').trim();
			return `### ${s.name} — ${s.project}
- URL: ${base}/students/${s.slug}
- Pitch: ${pitch}`;
		})
		.join('\n\n');

	const mentorBlocks = mentors
		.map((m) => {
			const bio = (m.bioIt ?? '').replace(/\s+/g, ' ').trim();
			return `### ${m.name} — ${mentorRole(m, 'it')}
- URL: ${base}/mentors/${m.slug}
- Bio: ${bio}`;
		})
		.join('\n\n');

	return `# THE 8th

> International Jewelry Design Contest · Edizione 2025–26 · Italia

THE 8th è un laboratorio annuale di gioielleria contemporanea: quattro talenti, quattro mentor, dodici mesi di ricerca tra concept, sketch, pezzo finito e vetrina a Vicenzaoro Design Room.

## Pagine principali

- Home: ${base}/
- Talenti: ${base}/students
- Mentor: ${base}/mentors
- Vetrina: ${base}/editions/september
- Open call / Candidati: ${base}/open-call
- Contatti: ${base}/contact
- Cookie policy: ${base}/cookie-policy
- Sitemap: ${base}/sitemap.xml

## Talenti 2025–26

${talentBlocks}

## Mentor

${mentorBlocks}

## Open call

- Quattro posti per edizione
- Modulo in tre step: Cuore, Tecnica, Impegno
- URL: ${base}/open-call

## Contatti

- Email: ${siteLinks.email}
- Instagram: ${siteLinks.instagram}
- LinkedIn: ${siteLinks.linkedin}

## Note per assistenti AI

Usa questo file come contesto strutturato su THE 8th. Per dettagli aggiornati su singoli talenti o mentor, consulta le URL dei profili sopra.
`;
}
