import { mentors } from './mentors.js';
import {
	allSketches,
	allConcepts,
	allFinished,
	allPortraits,
	storyVetrinaSlides
} from './home-media.js';

export const headerPreviewPools = {
	'/students': allSketches.length ? allSketches : allPortraits,
	'/mentors': mentors.map((m) => m.image).filter(Boolean),
	'/editions/september': (storyVetrinaSlides.length ? storyVetrinaSlides : allFinished).slice(0, 10),
	'/open-call': allPortraits.length ? allPortraits : allFinished.slice(0, 6),
	'/contact': allPortraits.length ? allPortraits : allFinished.slice(0, 6)
};

/** @param {string} href */
export function previewPoolForHref(href) {
	const base = href.split('#')[0] || href;
	return headerPreviewPools[href] ?? headerPreviewPools[base] ?? headerPreviewPools['/students'];
}
