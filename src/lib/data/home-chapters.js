/**
 * Mappa univoca sezioni home: numerazione sequenziale 01–15.
 */

/** @param {number} n */
export function formatChapterNum(n) {
	return String(n).padStart(2, '0');
}

/** @param {number} n */
export function formatChapterCode(n) {
	return `// ${formatChapterNum(n)}`;
}

/** Definizione statica (ordine DOM = ordine indice) */
export const HOME_CHAPTER_LAYOUT = [
	{ id: 'intro', kind: 'section', sectionId: 'home-chapter-intro', num: 1, labelKey: 'chapterIntro' },
	{ id: 'manifesto', kind: 'section', sectionId: 'home-chapter-manifesto', num: 2, labelKey: 'chapterManifesto' },
	{ id: 'sketch', kind: 'section', sectionId: 'home-chapter-sketch', num: 3, labelKey: 'chapterSketch' },
	{ id: 'courage', kind: 'section', sectionId: 'home-chapter-courage', num: 4, labelKey: 'chapterCourage' },
	{ id: 'path-05', kind: 'path', pathIndex: 0, num: 5, labelKey: 'path01Title' },
	{ id: 'path-06', kind: 'path', pathIndex: 1, num: 6, labelKey: 'path02Title' },
	{ id: 'path-07', kind: 'path', pathIndex: 2, num: 7, labelKey: 'path03Title' },
	{ id: 'path-08', kind: 'path', pathIndex: 3, num: 8, labelKey: 'path04Title' },
	{ id: 'mirror', kind: 'section', sectionId: 'home-chapter-mirror', num: 9, labelKey: 'chapterMirror' },
	{ id: 'talents', kind: 'section', sectionId: 'home-talents', num: 10, labelKey: 'chapterTalents' },
	{ id: 'mentors', kind: 'section', sectionId: 'home-mentors', num: 11, labelKey: 'chapterMentors' },
	{ id: 'works', kind: 'section', sectionId: 'home-chapter-works', num: 12, labelKey: 'chapterWorks' },
	{ id: 'vetrina', kind: 'section', sectionId: 'home-vetrina', num: 13, labelKey: 'chapterVetrina' },
	{ id: 'newsletter', kind: 'section', sectionId: 'home-newsletter', num: 14, labelKey: 'chapterNewsletter' },
	{ id: 'closing', kind: 'section', sectionId: 'home-chapter-closing', num: 15, labelKey: 'chapterClosing' }
];

/**
 * Copertina per ogni capitolo percorso 05–08 (4 step condensati).
 * @typedef {{ slug: string, kind: 'sketch' | 'concept' | 'finished' | 'vetrina', index?: number }} PathStepCoverSpec
 */
export const HOME_PATH_STEP_COVERS = /** @type {PathStepCoverSpec[]} */ ([
	{ slug: 'samuele', kind: 'sketch', index: 0 },
	{ slug: 'roya', kind: 'concept', index: 0 },
	{ slug: 'elena', kind: 'finished', index: 0 },
	{ slug: 'flavia', kind: 'vetrina', index: 0 }
]);

/** Posizione tipografica per ogni step del percorso (varietà in scroll). */
export const HOME_PATH_STEP_LAYOUTS = /** @type {const} */ ([
	'bottom-left',
	'top-right',
	'center',
	'bottom-right'
]);

/** @typedef {'bottom-left' | 'top-right' | 'center' | 'bottom-right' | 'top-left'} PathStepLayout */

/** @typedef {{ id: string, title: string, body: string, image: string, images: string[], num: string, code: string, layout: PathStepLayout }} PathStep */

const PATH_STEP_KEYS = ['path01Title', 'path02Title', 'path03Title', 'path04Title'];

const PATH_BODY_KEYS = ['path01Body', 'path02Body', 'path03Body', 'path04Body'];

/**
 * @param {(key: string) => string} t
 * @param {string[]} coverImages — una URL per capitolo 05–08
 */
export function buildHomePathSteps(t, coverImages) {
	return PATH_STEP_KEYS.map((labelKey, i) => {
		const num = 5 + i;
		const image = coverImages[i] ?? '';
		return {
			id: formatChapterNum(num),
			num: formatChapterNum(num),
			code: formatChapterCode(num),
			title: t(`home.${labelKey}`),
			body: t(`home.${PATH_BODY_KEYS[i]}`),
			image,
			images: image ? [image] : [],
			layout: HOME_PATH_STEP_LAYOUTS[i] ?? 'bottom-left'
		};
	});
}

/**
 * Capitoli per l’indice fisso.
 * @param {(key: string) => string} t
 */
export function buildHomeIndexChapters(t) {
	return HOME_CHAPTER_LAYOUT.map((item) => {
		const code = formatChapterNum(item.num);
		const title =
			item.labelKey.startsWith('path')
				? t(`home.${item.labelKey}`)
				: t(`home.${item.labelKey}`);
		if (item.kind === 'path') {
			return {
				id: item.id,
				type: 'path',
				code,
				title,
				stepIndex: item.pathIndex,
				num: item.num
			};
		}
		return {
			id: item.id,
			type: 'section',
			code,
			title,
			sectionId: item.sectionId
		};
	});
}

/** @param {number} num */
export function codeForSection(num) {
	return formatChapterCode(num);
}
