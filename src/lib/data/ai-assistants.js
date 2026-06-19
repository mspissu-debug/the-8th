/** @typedef {'it' | 'en'} Locale */

/** @type {AiAssistant[]} */
export const aiAssistants = [
	{
		id: 'chatgpt',
		name: 'ChatGPT',
		icon: '/icons/ai/chatgpt.png',
		buildUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`
	},
	{
		id: 'claude',
		name: 'Claude',
		icon: '/icons/ai/claude.png',
		buildUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
	}
];

/** @typedef {{ id: string; name: string; icon: string; buildUrl: (prompt: string) => string }} AiAssistant */
