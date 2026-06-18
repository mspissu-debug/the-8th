import assets from './student-assets.json';
import { isPlaceholder } from './placeholders.js';

const SLUGS = ['samuele', 'roya', 'elena', 'flavia'];

/** @param {string | null | undefined} src */
export function isStudentAsset(src) {
  if (!src || isPlaceholder(src)) return false;
  return src.startsWith('/students/');
}

/** @deprecated */
export function isProjectAsset(src) {
  return isStudentAsset(src);
}

/** @param {unknown[]} list */
export function uniqueUrls(list) {
  const urls = list.map(toSrc).filter((src) => typeof src === 'string');
  return [...new Set(urls.filter((src) => isStudentAsset(src)))];
}

/** @param {unknown} item */
function toSrc(item) {
  if (!item) return null;
  if (typeof item === 'string') return item;
  if (typeof item === 'object' && item && 'src' in item) {
    return /** @type {{ src: string }} */ (item).src;
  }
  return null;
}

/** @param {unknown} item */
function toHover(item) {
  if (item && typeof item === 'object' && 'hover' in item) {
    return /** @type {{ hover?: string }} */ (item).hover ?? null;
  }
  return null;
}

/** @param {string[] | { src: string; hover?: string }[] | undefined} list */
export function filterStudent(list) {
  /** @type {string[]} */
  const out = [];
  for (const item of list ?? []) {
    const src = toSrc(item);
    const hover = toHover(item);
    if (src && isStudentAsset(src)) out.push(src);
    if (hover && isStudentAsset(hover)) out.push(hover);
  }
  return uniqueUrls(out);
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
  const concept = filterStudent(a.concept);
  const sketchRaw = filterStudent(a.sketch);
  const sketch = sketchRaw.length ? sketchRaw : concept;
  const finished = filterStudent(a.finished);
  const vetrina = filterStudent(a.vetrina);
  const portrait = a.portrait && isStudentAsset(a.portrait) ? a.portrait : null;
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
    if (!src || isPlaceholder(src) || seen.has(src)) return;
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
