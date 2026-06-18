import { talents } from './talents.js';
import {
  allFinished,
  buildHomeHeroCarousel,
  buildHomeFilmStrip,
  storyVetrinaSlides,
  studentMedia,
  studentImagePool,
  uniqueUrls
} from './home-media.js';

const SLUGS = ['samuele', 'roya', 'elena', 'flavia'];

export const storyTones = {
  void: '#06060a',
  charcoal: '#0c0b10',
  ash: '#14131a',
  linen: '#e8e4dc',
  pearl: '#f2efe8',
  mist: '#c8c4bc',
  ink: '#1a1824'
};

export const storyHeroImages = buildHomeHeroCarousel(5);

export const storyFilmStripImages = buildHomeFilmStrip(8);

/** About: lavori e concept, niente ritratti */
export const aboutHeroImages = pathWorkImages(['concept', 'finished', 'sketch'], 10);
export const aboutFilmImages = pathWorkImages(['sketch', 'concept'], 14);

export const storyOrbitImages = uniqueUrls(allFinished).slice(0, 3);

/** Un set di immagini distinte per ogni step del percorso */
function pathStepImages(/** @type {string} */ slug, /** @type {'sketch'|'concept'|'finished'|'vetrina'|'portrait'} */ kind) {
  const m = studentMedia(slug);
  const pools = {
    sketch: m.sketch,
    concept: m.concept,
    finished: m.finished,
    vetrina: m.vetrina,
    portrait: m.portrait ? [m.portrait] : []
  };
  return pools[kind] ?? [];
}

/** Percorso home: solo lavori (sketch, concept, finished, vetrina), mai ritratti */
function pathWorkImages(/** @type {('sketch'|'concept'|'finished'|'vetrina')[]} */ kinds, /** @type {number} */ max = 10) {
  return uniqueUrls(SLUGS.flatMap((s) => kinds.flatMap((k) => pathStepImages(s, k)))).slice(0, max);
}

/** Poche immagini per fase: una per talento, poi cap (evita crossfade infiniti in scroll). */
function pathCategoryFew(
  /** @type {'sketch'|'concept'|'finished'|'vetrina'} */ kind,
  /** @type {number} */ limit = 2
) {
  return uniqueUrls(SLUGS.map((slug) => pathStepImages(slug, kind)[0]).filter(Boolean)).slice(0, limit);
}

/** @param {number} limit */
function pathPrototypeFew(limit = 2) {
  return uniqueUrls(
    SLUGS.flatMap((slug) => {
      const concept = pathStepImages(slug, 'concept')[0];
      const finished = pathStepImages(slug, 'finished')[0];
      return [concept, finished].filter(Boolean);
    })
  ).slice(0, limit);
}

/** Vetrina: solo asset reali; altrimenti fallback su finished. */
function pathVetrinaFew(limit = 2) {
  const vetrina = pathCategoryFew('vetrina', limit);
  if (vetrina.length >= limit) return vetrina;
  return uniqueUrls([...vetrina, ...pathCategoryFew('finished', limit)]).slice(0, limit);
}

export const storyPathImages = {
  crowd: pathCategoryFew('sketch', 1),
  courage: pathCategoryFew('concept', 1),
  concept: pathCategoryFew('concept', 2),
  sketch: pathCategoryFew('sketch', 2),
  prototype: pathPrototypeFew(2),
  finished: pathCategoryFew('finished', 2),
  shooting: pathVetrinaFew(2),
  vetrina: pathVetrinaFew(2)
};

export const storyWorks = talents.map((talent, i) => {
  const pool = studentImagePool(talent.slug);
  return {
    index: String(i + 1).padStart(2, '0'),
    image: pool[0] ?? talent.portrait,
    href: talent.href,
    name: talent.name,
    project: talent.project
  };
});

export const storyTalents = talents.map((talent) => {
  const m = studentMedia(talent.slug);
  const images = studentImagePool(talent.slug);
  const cover = m.portrait ?? talent.portrait ?? images[0] ?? '';

  return {
    ...talent,
    portrait: m.portrait ?? talent.portrait,
    cover,
    images
  };
});

export { storyVetrinaSlides };
