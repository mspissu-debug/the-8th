/** @param {string} role */
export function roleKicker(role) {
	const part = (role.split('·')[0] ?? role).trim();
	return part.toUpperCase();
}

/** @param {string} text @param {number} max */
export function excerpt(text, max = 140) {
	const clean = (text ?? '').replace(/\s+/g, ' ').trim();
	if (clean.length <= max) return clean;
	return `${clean.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

/** @param {string} name */
export function splitName(name) {
	const parts = (name ?? '').trim().split(/\s+/);
	if (parts.length < 2) return { first: name, last: '' };
	const last = parts.pop() ?? '';
	return { first: parts.join(' '), last };
}

const ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

/** @param {string} longText @param {number} max @param {string} year */
export function recognitionFromText(longText, max = 3, year = '2025–26') {
	const sentences = (longText ?? '')
		.replace(/\s+/g, ' ')
		.split(/(?<=[.!?])\s+/)
		.map((s) => s.trim())
		.filter(Boolean);

	return sentences.slice(0, max).map((text, i) => ({
		roman: ROMANS[i] ?? String(i + 1),
		year,
		text
	}));
}
