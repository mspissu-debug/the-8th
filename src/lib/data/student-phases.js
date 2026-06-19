import { filterMediaList, uniqueUrls } from './media-urls.js';
import { isPlaceholder } from './placeholders.js';

/** @typedef {{ id: string, labelKey: string, images: string[] }} ProductionPhase */

/**
 * Fasi carousel — immagini solo da Sanity (campi concept/sketch/finished/vetrina).
 * @param {{ concept?: unknown[], sketch?: unknown[], finished?: unknown[], vetrina?: unknown[] }} student
 * @returns {ProductionPhase[]}
 */
export function studentProductionPhases(student) {
	const concept = filterMediaList(student.concept);
	const sketch = filterMediaList(student.sketch);
	const sketchOrConcept = sketch.length ? sketch : concept;
	const finished = filterMediaList(student.finished);
	const vetrinaRaw = filterMediaList(student.vetrina).filter((src) => !isPlaceholder(src));
	const showcase =
		vetrinaRaw.length > 0
			? vetrinaRaw
			: finished.length > 0
				? finished.slice(-Math.min(4, finished.length))
				: [];

	return [
		{ id: '01', labelKey: 'people.phaseConceptBozze', images: concept },
		{ id: '02', labelKey: 'people.phaseSketch', images: sketchOrConcept },
		{ id: '03', labelKey: 'people.phaseFinished', images: finished },
		{ id: '04', labelKey: 'people.phaseVetrinaWorn', images: showcase }
	];
}
