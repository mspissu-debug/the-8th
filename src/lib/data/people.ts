import { mentors } from './mentors.js';
import { getBuiltinShowcases } from './showcase-registry.js';

const showcases = getBuiltinShowcases();

export const MENTORS = mentors.map((m, i) => ({
	id: i + 1,
	slug: m.slug,
	name: m.name,
	role: m.roleIt,
	specialty: m.roleIt.split('·')[0]?.trim() ?? m.roleIt,
	bio: m.bioIt,
	image: m.image
}));

export const STUDENTS = showcases.map((s, i) => ({
	id: i + 1,
	slug: s.slug,
	name: s.name,
	focus: s.project,
	bio: s.pitch,
	portrait: s.portrait
}));

export const MENTOR_BY_ID = Object.fromEntries(MENTORS.map((m) => [String(m.id), m]));
export const STUDENT_BY_ID = Object.fromEntries(STUDENTS.map((s) => [String(s.id), s]));
export const MENTOR_BY_SLUG = Object.fromEntries(MENTORS.map((m) => [m.slug, m]));
export const STUDENT_BY_SLUG = Object.fromEntries(STUDENTS.map((s) => [s.slug, s]));
