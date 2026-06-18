import {
  elenaShowcase,
  flaviaShowcase,
  royaShowcase,
  samueleShowcase
} from './student-showcases.js';
import { royaProjects } from './roya-projects.js';
import { samueleProjects } from './samuele-projects.js';
/** @typedef {import('./types.js').ProjectDetail} ProjectDetail */

/**
 * @typedef {Object} ShowcaseProjectLink
 * @property {string} slug
 * @property {string} title
 * @property {string} href
 */

/**
 * @typedef {Object} CustomShowcase
 * @property {string} slug
 * @property {string} name
 * @property {string} project
 * @property {string} [skin]
 * @property {string} pitch
 * @property {string} [portrait]
 * @property {{ instagram?: string }} [social]
 * @property {string[]} concept
 * @property {string[]} sketch
 * @property {string[]} finished
 * @property {ShowcaseProjectLink[]} [projects]
 * @property {Record<string, ProjectDetail>} [projectDetails]
 * @property {'custom'} [source]
 */

/** @typedef {CustomShowcase & { source?: 'builtin' | 'custom', skin: string }} StudentShowcase */

const BUILTIN_PROJECTS = /** @type {Record<string, Record<string, ProjectDetail>>} */ ({
  roya: royaProjects,
  samuele: samueleProjects
});

/** @type {StudentShowcase[]} */
const BUILTIN_SHOWCASES = [elenaShowcase, flaviaShowcase, royaShowcase, samueleShowcase].map((s) => ({
  ...s,
  skin: s.skin || 'default',
  source: /** @type {const} */ ('builtin')
}));

/** @param {CustomShowcase} raw */
export function normalizeCustom(raw) {
  const slug = slugify(raw.slug);
  const projects = (raw.projects ?? []).map((p) => ({
    slug: slugify(p.slug),
    title: p.title?.trim() || p.slug,
    href: `/students/${slug}/${slugify(p.slug)}`
  }));

  return {
    ...raw,
    slug,
    skin: raw.skin || 'default',
    portrait: raw.portrait || raw.concept?.[0] || '',
    social: raw.social ?? { instagram: '' },
    concept: raw.concept ?? [],
    sketch: raw.sketch ?? [],
    finished: raw.finished?.length ? raw.finished : raw.concept ?? [],
    projects,
    projectDetails: raw.projectDetails ?? {},
    source: /** @type {const} */ ('custom')
  };
}

/** @param {string} value */
export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** @returns {StudentShowcase[]} */
export function getBuiltinShowcases() {
  return BUILTIN_SHOWCASES;
}

/** @returns {StudentShowcase[]} */
export function getBuiltinShowcasesList() {
  return BUILTIN_SHOWCASES;
}

/** @param {string} slug */
export function getBuiltinShowcaseBySlug(slug) {
  return BUILTIN_SHOWCASES.find((s) => s.slug === slug) ?? null;
}

/** @param {string} studentSlug */
/** @param {string} projectSlug */
export function getBuiltinProjectBySlugs(studentSlug, projectSlug) {
  const key = slugify(projectSlug);
  const showcase = getBuiltinShowcaseBySlug(studentSlug);
  if (!showcase) return null;
  if (showcase.projectDetails?.[key]) return showcase.projectDetails[key];
  const builtin = BUILTIN_PROJECTS[studentSlug];
  return builtin?.[key] ?? null;
}

/** @returns {import('./talents.js').TalentEntry[]} */
export function getBuiltinTalentEntries() {
  return BUILTIN_SHOWCASES.map((s) => ({
    slug: s.slug,
    href: `/students/${s.slug}`,
    name: s.name,
    project: s.project,
    portrait: s.portrait,
    image: s.portrait
  }));
}

/** @param {import('./talents.js').TalentEntry[]} talents */
/** @param {string} slug */
export function getTalentNeighborsFrom(talents, slug) {
  const index = talents.findIndex((t) => t.slug === slug);
  if (index < 0) return { index: -1, prev: null, next: null };
  return {
    index,
    prev: index > 0 ? talents[index - 1] : null,
    next: index < talents.length - 1 ? talents[index + 1] : null
  };
}

/** @param {StudentShowcase[]} showcases */
/** @param {string} slug */
export function getShowcaseFromList(showcases, slug) {
  return showcases.find((s) => s.slug === slug) ?? null;
}

/** @param {StudentShowcase[]} showcases */
/** @param {string} studentSlug */
/** @param {string} projectSlug */
export function getProjectFromList(showcases, studentSlug, projectSlug) {
  const showcase = getShowcaseFromList(showcases, studentSlug);
  if (!showcase) return null;
  const key = slugify(projectSlug);
  if (showcase.projectDetails?.[key]) return showcase.projectDetails[key];
  const builtin = BUILTIN_PROJECTS[studentSlug];
  return builtin?.[key] ?? null;
}

/** @param {CustomShowcase} showcase */
export function validateShowcase(showcase) {
  const errors = [];
  if (!slugify(showcase.slug)) errors.push('Slug obbligatorio');
  if (!showcase.name?.trim()) errors.push('Nome obbligatorio');
  if (!showcase.project?.trim()) errors.push('Progetto obbligatorio');
  if (!showcase.pitch?.trim()) errors.push('Pitch obbligatorio');
  const urls = [...(showcase.concept ?? []), ...(showcase.sketch ?? []), ...(showcase.finished ?? [])];
  if (!urls.some((u) => u?.trim())) errors.push('Almeno un URL immagine (concept, sketch o finished)');
  return errors;
}

/** @param {string} slug */
export function isBuiltinSlug(slug) {
  return BUILTIN_SHOWCASES.some((s) => s.slug === slug);
}
