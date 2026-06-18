import assets from './student-assets.json';
import { isPlaceholder } from './placeholders.js';

/** @param {string | { src: string }} item */
const toSrc = (item) => (typeof item === 'string' ? item : item.src);

/** Mischia immagini reali di tutti gli studenti (vetrina + finished + concept) */
export function buildHeroSlides(max = 10) {
  const slugs = ['samuele', 'roya', 'elena', 'flavia'];
  const pools = slugs.map((slug) => {
    const a = assets[slug];
    const vetrina = (a.vetrina ?? []).filter((p) => p && !isPlaceholder(p));
    const finished = a.finished.map(toSrc).filter((p) => p && !isPlaceholder(p));
    const concept = (a.concept ?? []).filter((p) => p && !isPlaceholder(p));
    return [...vetrina, ...finished, ...concept];
  });

  /** @type {string[]} */
  const mixed = [];
  let round = 0;
  while (mixed.length < max && pools.some((p) => p.length > round)) {
    for (const pool of pools) {
      if (pool[round] && mixed.length < max) mixed.push(pool[round]);
    }
    round += 1;
  }

  return mixed;
}

export const heroSlides = buildHeroSlides(6);
