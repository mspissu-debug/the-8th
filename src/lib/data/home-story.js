import { talents } from './talents.js';
import { HOME_PATH_STEP_COVERS } from './home-chapters.js';
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

/** Una sola immagine per capitolo percorso 05–08 (allineata all’indice). */
function resolvePathStepCover(/** @type {import('./home-chapters.js').PathStepCoverSpec} */ spec) {
  const list = pathStepImages(spec.slug, spec.kind);
  const idx = spec.index ?? 0;
  return list[idx] ?? list[0] ?? '';
}

/** URL fisse per scroll capitoli 05–08. */
export const storyPathCoverImages = HOME_PATH_STEP_COVERS.map((spec) =>
  resolvePathStepCover(spec)
);

/** @deprecated Usare storyPathCoverImages + buildHomePathSteps */
export const storyPathImages = {
  crowd: storyPathCoverImages.slice(0, 1),
  courage: storyPathCoverImages.slice(1, 2),
  concept: storyPathCoverImages.slice(2, 3),
  vetrina: storyPathCoverImages.slice(3, 4)
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
