/** Percorsi breadcrumb — route ibrido Michele */

/** @typedef {{ href?: string, label: string }} Crumb */
/** @typedef {{ href: string, label: string, hint?: string }} BackLink */

const home = { href: '/', label: 'THE 8th' };
const students = { href: '/students', label: 'Talenti' };
const mentors = { href: '/mentors', label: 'Mentor' };

/** @returns {Crumb[]} */
export function trailTalenti() {
	return [home, { label: 'Talenti' }];
}

/** @returns {Crumb[]} */
export function trailMentors() {
	return [home, { label: 'Mentor' }];
}

/** @returns {BackLink} */
export function backFromTalenti() {
	return { href: '/', label: 'Torna alla home', hint: 'Presentazione e sezioni principali' };
}

/** @returns {BackLink} */
export function backFromMentors() {
	return { href: '/', label: 'Torna alla home', hint: 'Presentazione e sezioni principali' };
}

/**
 * @param {string} name
 * @param {string} slug
 */
export function trailStudent(name, slug) {
	return [home, students, { label: name }];
}

/** @returns {BackLink} */
export function backFromStudent() {
	return {
		href: '/students',
		label: 'Torna all’elenco talenti',
		hint: 'Quattro designer dell’edizione'
	};
}

/** @param {string} pageTitle */
export function trailSite(pageTitle) {
	return [home, { label: pageTitle }];
}

/** @returns {BackLink} */
export function backFromSite() {
	return { href: '/', label: 'Torna alla home', hint: 'THE 8th' };
}

/** @param {string} name */
export function trailMentor(name) {
	return [home, mentors, { label: name }];
}

/** @returns {BackLink} */
export function backFromMentor() {
	return {
		href: '/mentors',
		label: 'Torna all’elenco mentor',
		hint: 'Curatori e maestri del progetto'
	};
}
