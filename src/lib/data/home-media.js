import assets from './student-assets.json';
import {
	filterMediaList,
	isMediaUrl,
	uniqueUrls
} from './media-urls.js';

const SLUGS = ['samuele', 'roya', 'elena', 'flavia'];

export { isMediaUrl, uniqueUrls };

/** @deprecated Usa isMediaUrl */
export function isStudentAsset(src) {
	return isMediaUrl(src);
}

/** @deprecated */
export function isProjectAsset(src) {
	return isMediaUrl(src);
}

/** @param {unknown[]} list */
export function filterStudent(list) {
	return filterMediaList(list);
}

/** Immagini uniche per studente (senza ripetere finished in vetrina) */
/** @param {string} slug @param {number} max */
export function studentHeroImages(slug, max = 10) {
	return studentImagePool(slug).slice(0, max);
}

export function studentImagePool(slug) {
	const m = studentMedia(slug);
	return uniqueUrls([
		...m.finished,
		...m.vetrina,
		...m.sketch,
		...m.concept,
		...(m.portrait ? [m.portrait] : [])
	]);
}

/** @param {string} slug */
export function studentMedia(slug) {
	const a = assets[slug];
	if (!a) return { portrait: null, concept: [], sketch: [], finished: [], vetrina: [] };
	const concept = filterMediaList(a.concept);
	const sketchRaw = filterMediaList(a.sketch);
	const sketch = sketchRaw.length ? sketchRaw : concept;
	const finished = filterMediaList(a.finished);
	const vetrina = filterMediaList(a.vetrina);
	const portrait = a.portrait && isMediaUrl(a.portrait) ? a.portrait : null;
	return { portrait, concept, sketch, finished, vetrina };
}

export const allSketches = uniqueUrls(SLUGS.flatMap((slug) => studentMedia(slug).sketch));
export const allConcepts = uniqueUrls(SLUGS.flatMap((slug) => studentMedia(slug).concept));
export const allFinished = uniqueUrls(SLUGS.flatMap((slug) => studentMedia(slug).finished));
export const allVetrinaStudent = uniqueUrls(SLUGS.flatMap((slug) => studentMedia(slug).vetrina));
export const allPortraits = SLUGS.map((slug) => studentMedia(slug).portrait).filter(Boolean);

export const allShooting = uniqueUrls([...allVetrinaStudent, ...allFinished]);

/**
 * Hero/gate: immagini uniche, alternate per talento (no ripetizioni tra pool).
 * @param {number} max
 */
export function buildHomeHeroCarousel(max = 5) {
	const seen = new Set();
	/** @type {string[]} */
	const picks = [];

	const add = (/** @type {string | undefined} */ src) => {
		if (!src || !isMediaUrl(src) || seen.has(src)) return;
		seen.add(src);
		picks.push(src);
	};

	for (const slug of SLUGS) {
		if (picks.length >= max) break;
		add(studentMedia(slug).finished[0]);
	}
	for (const slug of SLUGS) {
		if (picks.length >= max) break;
		add(studentMedia(slug).sketch[0]);
	}
	for (const slug of SLUGS) {
		if (picks.length >= max) break;
		add(studentMedia(slug).concept[0]);
	}

	return picks.slice(0, max);
}

/** Film strip: una passata per talento, max immagini uniche */
export function buildHomeFilmStrip(max = 16) {
	/** @type {string[]} */
	const out = [];
	const seen = new Set();

	for (const slug of SLUGS) {
		const m = studentMedia(slug);
		for (const src of [...m.sketch, ...m.concept, ...m.finished].slice(0, 4)) {
			if (out.length >= max) break;
			if (!seen.has(src)) {
				seen.add(src);
				out.push(src);
			}
		}
	}
	return out;
}

export const storyVetrinaSlides =
	allVetrinaStudent.length > 0 ? allVetrinaStudent : allFinished;
