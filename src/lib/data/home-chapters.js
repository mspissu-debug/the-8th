/**
 * Mappa univoca sezioni home: numerazione sequenziale 01–18 (nessun ripetuto).
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
	{ id: 'path-09', kind: 'path', pathIndex: 4, num: 9, labelKey: 'path05Title' },
	{ id: 'path-10', kind: 'path', pathIndex: 5, num: 10, labelKey: 'path06Title' },
	{ id: 'path-11', kind: 'path', pathIndex: 6, num: 11, labelKey: 'path07Title' },
	{ id: 'path-12', kind: 'path', pathIndex: 7, num: 12, labelKey: 'path08Title' },
	{ id: 'mirror', kind: 'section', sectionId: 'home-chapter-mirror', num: 13, labelKey: 'chapterMirror' },
	{ id: 'talents', kind: 'section', sectionId: 'home-talents', num: 14, labelKey: 'chapterTalents' },
	{ id: 'mentors', kind: 'section', sectionId: 'home-mentors', num: 15, labelKey: 'chapterMentors' },
	{ id: 'works', kind: 'section', sectionId: 'home-chapter-works', num: 16, labelKey: 'chapterWorks' },
	{ id: 'vetrina', kind: 'section', sectionId: 'home-vetrina', num: 17, labelKey: 'chapterVetrina' },
	{ id: 'newsletter', kind: 'section', sectionId: 'home-newsletter', num: 18, labelKey: 'chapterNewsletter' },
	{ id: 'closing', kind: 'section', sectionId: 'home-chapter-closing', num: 19, labelKey: 'chapterClosing' }
];

/**
 * Copertina fissa per ogni capitolo indice 05–12 (ordine = path01…path08).
 * @typedef {{ slug: string, kind: 'sketch' | 'concept' | 'finished' | 'vetrina', index?: number }} PathStepCoverSpec
 */
export const HOME_PATH_STEP_COVERS = /** @type {PathStepCoverSpec[]} */ ([
	{ slug: 'samuele', kind: 'sketch', index: 0 },
	{ slug: 'roya', kind: 'concept', index: 0 },
	{ slug: 'elena', kind: 'concept', index: 0 },
	{ slug: 'flavia', kind: 'sketch', index: 0 },
	{ slug: 'samuele', kind: 'concept', index: 0 },
	{ slug: 'roya', kind: 'finished', index: 0 },
	{ slug: 'elena', kind: 'finished', index: 0 },
	{ slug: 'flavia', kind: 'vetrina', index: 0 }
]);

/** @typedef {{ id: string, title: string, body: string, image: string, images: string[], num: string, code: string }} PathStep */

const PATH_STEP_KEYS = [
	'path01Title',
	'path02Title',
	'path03Title',
	'path04Title',
	'path05Title',
	'path06Title',
	'path07Title',
	'path08Title'
];

const PATH_BODY_KEYS = [
	'path01Body',
	'path02Body',
	'path03Body',
	'path04Body',
	'path05Body',
	'path06Body',
	'path07Body',
	'path08Body'
];

/**
 * @param {(key: string) => string} t
 * @param {string[]} coverImages — una URL per capitolo 05–12
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
			images: image ? [image] : []
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
