export const NARRATIVE_PHRASES = [
	{ label: null, text: 'Quattro\nstudenti.' },
	{ label: null, text: 'Quattro\nmentori.' },
	{ label: '08', text: 'Una\nsola visione.' },
	{ label: null, text: 'Due\nedizioni.' },
	{ label: '12', text: 'Mesi\ndi lavoro.' },
	{ label: null, text: 'The\n8.' }
] as const;

export const MILESTONES = [
	{
		year: '2024',
		tag: 'I',
		label: 'Fondazione',
		desc: "[Come e perché è nato THE 8th. La visione originale, chi l'ha ideato e il contesto della gioielleria italiana da cui è emerso.]"
	},
	{
		year: '2024',
		tag: 'II',
		label: 'Prima Edizione',
		desc: '[La prima edizione: il tema scelto, le prime quattro coppie studente–mentore, le sfide affrontate e i risultati ottenuti.]'
	},
	{
		year: '2025',
		tag: 'III',
		label: 'Crescita',
		desc: '[Come il programma si è evoluto. Nuove collaborazioni, riconoscimenti nel settore, feedback dei partecipanti.]'
	},
	{
		year: '2026',
		tag: 'IV',
		label: 'Oggi',
		desc: "[Dove siamo adesso. L'edizione di settembre 2026, la visione per il futuro e cosa THE 8th vuole diventare.]"
	}
] as const;

export const EDITIONS = [
	{
		to: '/editions/previous',
		tag: 'Archivio',
		label: 'Edizione 01',
		year: '2024 — 2025',
		meta: '04 studenti · 04 mentori · 12 mesi',
		desc: "[Tema dell'edizione precedente. Cosa ha esplorato — in una frase asciutta, di pochi colpi.]"
	},
	{
		to: '/editions/september',
		tag: 'In corso',
		label: 'Edizione 02',
		year: '2025 — 2026',
		meta: '04 studenti · 04 mentori · 12 mesi',
		desc: '[Tema attuale · La domanda che questa edizione pone · Cosa stanno creando gli studenti.]'
	}
] as const;
