import {
  getBuiltinTalentEntries,
  getTalentNeighborsFrom
} from './showcase-registry.js';

/** @typedef {{ slug: string, href: string, name: string, project: string, portrait?: string, image?: string }} TalentEntry */

/** Elenco predefinito (4 talenti edizione) — per dati aggiornati usare `page.data.talents` dal layout. */
export const talents = getBuiltinTalentEntries();

/** @param {TalentEntry[]} talentList */
/** @param {string} slug */
export function getTalentBySlugFrom(talentList, slug) {
  return talentList.find((t) => t.slug === slug);
}

/** @param {TalentEntry[]} talentList */
/** @param {string} slug */
export function getTalentNeighborsFromList(talentList, slug) {
  return getTalentNeighborsFrom(talentList, slug);
}

/** @param {string} slug */
export function getTalentBySlug(slug) {
  return getTalentBySlugFrom(talents, slug);
}

/** @param {string} pathname */
export function getTalentSlugFromPath(pathname) {
  const match = pathname.match(/^\/students\/([^/]+)/);
  if (!match) return null;
  const slug = match[1];
  return getTalentBySlug(slug) ? slug : null;
}

/** @param {string} slug */
export function getTalentNeighbors(slug) {
  return getTalentNeighborsFrom(talents, slug);
}

/**
 * @param {string} pathname
 * @param {TalentEntry[]} [talentList]
 */
export function isTalentiSection(pathname, talentList) {
  if (pathname === '/talenti') return true;
  const match = pathname.match(/^\/students\/([^/]+)/);
  if (!match) return false;
  const list = talentList ?? talents;
  return list.some((t) => t.slug === match[1]);
}
