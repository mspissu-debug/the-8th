import { getBuiltinShowcases } from './showcase-registry.js';
import { mentors } from './mentors.js';

/** Coppie studente–mentor dell’edizione (ordine Matteo) */
export const EDITION_PAIRS = getBuiltinShowcases().map((student, i) => {
	const mentor = mentors[i];
	return {
		studentSlug: student.slug,
		studentName: student.name,
		studentProject: student.project,
		studentPortrait: student.portrait,
		mentorSlug: mentor?.slug ?? '',
		mentorName: mentor?.name ?? '',
		mentorImage: mentor?.image ?? ''
	};
});
