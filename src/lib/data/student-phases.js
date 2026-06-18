import { filterStudent, studentMedia, uniqueUrls } from './home-media.js';
import { isPlaceholder } from './placeholders.js';

/** @typedef {{ id: string, labelKey: string, images: string[] }} ProductionPhase */

/** @param {unknown} item */
function toHover(item) {
	if (item && typeof item === 'object' && 'hover' in item) {
		return /** @type {{ hover?: string }} */ (item).hover ?? null;
	}
	return null;
}

/**
 * Quattro fasi editoriali: concept/bozze → sketch → finito → vetrina/indossato.
 * @param {{ slug: string, concept?: unknown[], sketch?: unknown[], finished?: unknown[], vetrina?: unknown[] }} student
 * @returns {ProductionPhase[]}
 */
export function studentProductionPhases(student) {
	const m = studentMedia(student.slug);
	const concept = uniqueUrls([...filterStudent(student.concept), ...m.concept]);
	const sketch = uniqueUrls([...filterStudent(student.sketch), ...m.sketch]);
	const finished = uniqueUrls([...filterStudent(student.finished), ...m.finished]);
	const worn = uniqueUrls((student.finished ?? []).map(toHover));
	const vetrinaRaw = uniqueUrls([...filterStudent(student.vetrina), ...m.vetrina]).filter(
		(src) => !isPlaceholder(src)
	);
	const showcase =
		vetrinaRaw.length > 0 ? vetrinaRaw : worn.length > 0 ? worn : finished.slice(-Math.min(4, finished.length));

	return [
		{ id: '01', labelKey: 'people.phaseConceptBozze', images: concept },
		{ id: '02', labelKey: 'people.phaseSketch', images: sketch },
		{ id: '03', labelKey: 'people.phaseFinished', images: finished },
		{ id: '04', labelKey: 'people.phaseVetrinaWorn', images: showcase }
	];
}
