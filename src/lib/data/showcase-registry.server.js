import { readCustomShowcases } from '$lib/server/showcases-store.js';
import {
  getBuiltinShowcasesList,
  getBuiltinTalentEntries,
  getBuiltinShowcaseBySlug,
  getBuiltinProjectBySlugs,
  getShowcaseFromList,
  getProjectFromList,
  getTalentNeighborsFrom,
  normalizeCustom,
  slugify,
  validateShowcase,
  isBuiltinSlug
} from './showcase-registry.js';

export {
  slugify,
  normalizeCustom,
  validateShowcase,
  isBuiltinSlug,
  getBuiltinShowcasesList,
  getBuiltinShowcaseBySlug
};

/** @returns {import('./showcase-registry.js').StudentShowcase[]} */
export function getCustomShowcases() {
  return readCustomShowcases().map(normalizeCustom);
}

/** @returns {import('./showcase-registry.js').StudentShowcase[]} */
export function getAllShowcases() {
  const custom = getCustomShowcases();
  const customSlugs = new Set(custom.map((s) => s.slug));
  const builtins = getBuiltinShowcasesList().filter((s) => !customSlugs.has(s.slug));
  return [...builtins, ...custom];
}

/** @param {string} slug */
export function getShowcaseBySlug(slug) {
  return getShowcaseFromList(getAllShowcases(), slug);
}

/** @param {string} studentSlug */
/** @param {string} projectSlug */
export function getProjectBySlugs(studentSlug, projectSlug) {
  return getProjectFromList(getAllShowcases(), studentSlug, projectSlug);
}

/** @returns {import('./talents.js').TalentEntry[]} */
export function getTalentEntries() {
  return getAllShowcases().map((s) => ({
    slug: s.slug,
    href: `/students/${s.slug}`,
    name: s.name,
    project: s.project,
    portrait: s.portrait,
    image: s.portrait
  }));
}

/** @param {string} slug */
export function getTalentNeighbors(slug) {
  return getTalentNeighborsFrom(getTalentEntries(), slug);
}

/** @param {string} pathname */
export function getTalentSlugFromPath(pathname) {
  const match = pathname.match(/^\/students\/([^/]+)/);
  if (!match) return null;
  return getShowcaseBySlug(match[1]) ? match[1] : null;
}
