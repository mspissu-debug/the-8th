import { createClient } from '@sanity/client';
import { mentors } from '../src/lib/data/mentors.js';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
	throw new Error('Missing PUBLIC_SANITY_PROJECT_ID in environment.');
}

if (!token) {
	throw new Error('Missing SANITY_API_WRITE_TOKEN in environment.');
}

const client = createClient({
	projectId,
	dataset,
	apiVersion: '2025-06-15',
	useCdn: false,
	token
});

const showcases = [
	{
		slug: 'elena',
		name: 'Elena Moscara',
		project: 'Meta-Florea',
		pitch:
			'Meta-Florea esplora la metamorfosi tra natura e gioiello: forme organiche, materiali vivi e una collezione pensata per la vetrina di Vicenzaoro.'
	},
	{
		slug: 'flavia',
		name: 'Flavia Di Stefano',
		project: 'Metamorfosi',
		pitch:
			'Metamorfosi nasce dal quarzo rutilato e dall’impronta: trasformazione della materia in gioiello, tra schizzo, analisi della forma e pezzo finito in vetrina.'
	},
	{
		slug: 'roya',
		name: 'Roya Ammari',
		project: 'DREAM No. LXXXIII',
		pitch:
			'Dal bismuto (Bi 83) nasce un messaggio onirico: rivalsa, memoria e persona tradotte in gioiello — lontana dall’Iran, dove non c’era spazio per lavorare né per esistere da sé.'
	},
	{
		slug: 'samuele',
		name: 'Samuele Fruet',
		project: 'RITMO',
		pitch:
			'RITMO — tre atti tra titanio, luce e codice Morse. Al passaggio del mouse sul prodotto finito si rivela la controparte fosforescente.'
	}
];

const mentorDocs = mentors.map((m, index) => ({
	_id: `mentor.${m.slug}`,
	_type: 'mentor',
	name: m.name,
	slug: { _type: 'slug', current: m.slug },
	roleIt: m.roleIt,
	roleEn: m.roleEn,
	bioIt: m.bioIt,
	bioEn: m.bioEn,
	website: m.website,
	order: index,
	published: true
}));

const talentDocs = showcases.map((s, index) => ({
	_id: `talent.${s.slug}`,
	_type: 'talent',
	name: s.name,
	slug: { _type: 'slug', current: s.slug },
	project: s.project,
	pitchIt: s.pitch,
	pitchEn: s.pitch,
	instagram: 'https://instagram.com',
	edition: '2025-26',
	order: index,
	published: true
}));

let tx = client.transaction();
for (const doc of mentorDocs) tx = tx.createOrReplace(doc);
for (const doc of talentDocs) tx = tx.createOrReplace(doc);

const result = await tx.commit();

console.log(`Seed completed on project ${projectId}/${dataset}.`);
console.log(`Mentors upserted: ${mentorDocs.length}`);
console.log(`Talents upserted: ${talentDocs.length}`);
console.log(`Transaction id: ${result.transactionId}`);
