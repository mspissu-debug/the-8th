/** @typedef {'it' | 'en'} Locale */
/** @typedef {'url' | 'clipboard'} AiPrefillMode */

/** @type {Record<Locale, string>} */
export const aiAssistantPrompts = {
	it: "Cos'è THE 8th? Come funziona il contest internazionale di jewelry design? Spiegami il percorso annuale con quattro mentor e quattro talenti, la vetrina a Vicenzaoro e come candidarsi all'open call.",
	en: 'What is THE 8th? How does the international jewelry design contest work? Explain the annual program with four mentors and four talents, the Vicenzaoro showcase, and how to apply to the open call.'
};

/** @typedef {{ id: string; name: string; icon: string; prefill: AiPrefillMode; buildUrl: (prompt: string) => string }} AiAssistant */

/** @type {AiAssistant[]} */
export const aiAssistants = [
	{
		id: 'chatgpt',
		name: 'ChatGPT',
		icon: '/icons/ai/chatgpt.png',
		prefill: 'url',
		buildUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`
	},
	{
		id: 'claude',
		name: 'Claude',
		icon: '/icons/ai/claude.png',
		prefill: 'url',
		buildUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
	},
	{
		id: 'gemini',
		name: 'Gemini',
		icon: '/icons/ai/gemini.png',
		prefill: 'clipboard',
		buildUrl: () => 'https://gemini.google.com/app'
	},
	{
		id: 'groq',
		name: 'Groq',
		icon: '/icons/ai/groq.png',
		prefill: 'clipboard',
		buildUrl: () => 'https://chat.groq.com/'
	}
];

/** @param {Locale} locale */
export function getAiAssistantPrompt(locale) {
	return aiAssistantPrompts[locale] ?? aiAssistantPrompts.it;
}

/** @param {string} text */
export async function copyAiPrompt(text) {
	if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// fallback below
		}
	}

	if (typeof document === 'undefined') return false;

	const textarea = document.createElement('textarea');
	textarea.value = text;
	textarea.setAttribute('readonly', '');
	textarea.style.position = 'fixed';
	textarea.style.left = '-9999px';
	document.body.appendChild(textarea);
	textarea.select();

	let ok = false;
	try {
		ok = document.execCommand('copy');
	} finally {
		document.body.removeChild(textarea);
	}

	return ok;
}
