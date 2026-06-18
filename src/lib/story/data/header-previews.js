import { mentors } from './mentors.js';
import {
  allSketches,
  allConcepts,
  allFinished,
  allVetrinaStudent,
  allPortraits,
  storyVetrinaSlides
} from './home-media.js';

export const headerPreviewPools = {
  '/about': allConcepts.slice(0, 8).length ? allConcepts.slice(0, 8) : allSketches.slice(0, 8),
  '/#manifesto': allConcepts.slice(0, 8).length ? allConcepts.slice(0, 8) : allSketches.slice(0, 8),
  '/talenti': allSketches.length ? allSketches : allPortraits,
  '/mentori': mentors.map((m) => m.image).filter(Boolean),
  '/vetrina': (storyVetrinaSlides.length ? storyVetrinaSlides : allFinished).slice(0, 10),
  '/open-call': allPortraits.length ? allPortraits : allFinished.slice(0, 6),
  '/contact': allFinished.slice(0, 6)
};

/** @param {string} href */
export function previewPoolForHref(href) {
  return headerPreviewPools[href] ?? headerPreviewPools['/about'];
}
