/** @typedef {'it' | 'en'} Locale */

/** @typedef {{
 *   key: string;
 *   vars: Record<string, string>;
 * }} AiContext */

/** @param {string} pathname @param {Record<string, string | undefined>} [pageVars] */
export function resolveAiContext(pathname, pageVars = {}) {
	/** @type {Record<string, string>} */
	const vars = {};
	for (const [k, v] of Object.entries(pageVars)) {
		if (v) vars[k] = v;
	}

	if (pathname === '/') return { key: 'home', vars };
	if (pathname === '/students') return { key: 'students', vars };
	if (pathname.startsWith('/students/')) return { key: 'student', vars };
	if (pathname === '/mentors') return { key: 'mentors', vars };
	if (pathname.startsWith('/mentors/')) return { key: 'mentor', vars };
	if (pathname.startsWith('/editions/')) return { key: 'vetrina', vars };
	if (pathname === '/open-call') return { key: 'openCall', vars };
	if (pathname === '/contact') return { key: 'contact', vars };
	if (pathname === '/cookie-policy') return { key: 'cookie', vars };

	return { key: 'default', vars };
}

/** @param {string} template @param {Record<string, string>} [vars] */
function fillTemplate(template, vars = {}) {
	return Object.entries(vars).reduce(
		(text, [key, value]) => text.replaceAll(`{${key}}`, value),
		template
	);
}

/** @type {Record<string, Record<Locale, string>>} */
const aiPromptTemplates = {
	home: {
		it: "Cos'è THE 8th? Come funziona il contest internazionale di jewelry design? Spiegami il percorso annuale con quattro mentor e quattro talenti, la vetrina a Vicenzaoro e come candidarsi all'open call.",
		en: 'What is THE 8th? How does the international jewelry design contest work? Explain the annual program with four mentors and four talents, the Vicenzaoro showcase, and how to apply to the open call.'
	},
	students: {
		it: 'Chi sono i quattro talenti di THE 8th edizione 2025–26? Raccontami le loro storie, i progetti in gioielleria contemporanea e come il programma li accompagna dal concept alla vetrina.',
		en: 'Who are the four talents of THE 8th 2025–26 edition? Tell me their stories, contemporary jewellery projects, and how the program supports them from concept to showcase.'
	},
	student: {
		it: 'Parlami del talento {name} e del progetto {project} in THE 8th: concept, processo creativo, fasi di lavoro (concept, sketch, pezzo finito, vetrina) e ruolo del mentor nel percorso.',
		en: 'Tell me about talent {name} and the project {project} at THE 8th: concept, creative process, work phases (concept, sketch, finished piece, showcase), and the mentor’s role in the journey.'
	},
	mentors: {
		it: 'Chi sono i mentor di THE 8th? Spiegami il loro ruolo nel programma: come guidano i talenti dalla visione creativa al pezzo finito e alla presentazione in vetrina.',
		en: 'Who are THE 8th mentors? Explain their role in the program: how they guide talents from creative vision to the finished piece and showcase presentation.'
	},
	mentor: {
		it: 'Parlami del mentor {name} in THE 8th: il suo percorso nella gioielleria contemporanea, il metodo di guida e il talento che affianca in questa edizione.',
		en: 'Tell me about mentor {name} at THE 8th: their path in contemporary jewellery, mentoring approach, and the talent they support in this edition.'
	},
	vetrina: {
		it: 'Cos’è la vetrina THE 8th a Vicenzaoro Design Room? Spiegami come le collezioni finite dei talenti arrivano al mercato internazionale del gioiello dopo il percorso annuale.',
		en: 'What is THE 8th showcase at Vicenzaoro Design Room? Explain how the talents’ finished collections reach the international jewellery market after the annual program.'
	},
	openCall: {
		it: 'Come candidarsi a THE 8th? Spiegami l’open call: requisiti, le tre fasi del modulo (Cuore, Tecnica, Impegno), cosa serve nel portfolio e quanti posti ci sono per edizione.',
		en: 'How do I apply to THE 8th? Explain the open call: requirements, the three form steps (Heart, Technique, Commitment), portfolio expectations, and how many places are available per edition.'
	},
	contact: {
		it: 'Come contattare THE 8th? Spiegami a chi rivolgersi per partnership, stampa, istituzioni e richieste sul progetto del contest di jewelry design.',
		en: 'How can I contact THE 8th? Explain who to reach for partnerships, press, institutions, and inquiries about the jewellery design contest.'
	},
	cookie: {
		it: 'Spiegami in modo chiaro la cookie policy di THE 8th: quali cookie usa il sito, a cosa servono e come gestire le preferenze.',
		en: 'Explain THE 8th cookie policy clearly: which cookies the site uses, what they are for, and how to manage preferences.'
	},
	default: {
		it: "Cos'è THE 8th e come funziona il suo programma annuale di gioielleria contemporanea con mentor, talenti e vetrina internazionale?",
		en: 'What is THE 8th and how does its annual contemporary jewellery program work with mentors, talents, and an international showcase?'
	}
};

/** @param {Locale} locale @param {AiContext} context */
export function getAiAssistantPrompt(locale, context) {
	const templates = aiPromptTemplates[context.key] ?? aiPromptTemplates.default;
	const template = templates[locale] ?? templates.it;
	return fillTemplate(template, context.vars);
}

/** @param {string} text @param {Record<string, string>} [vars] */
export function formatAiCopy(text, vars = {}) {
	return fillTemplate(text, vars);
}
