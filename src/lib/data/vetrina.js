import slidesManifest from './vetrina-slides.json';
import studentAssets from './student-assets.json';
import { isPlaceholder } from './placeholders.js';

/** @type {string[]} */
const MANIFEST_SLIDES = slidesManifest.slides ?? [];
const EXCLUDED_SLIDES = new Set(['/vetrina/10.webp']);
const CURATED_MANIFEST = MANIFEST_SLIDES.filter((src) => !EXCLUDED_SLIDES.has(src));

/** @type {string[]} */
const STUDENT_FINISHED = [
  studentAssets.samuele.finished[0]?.src,
  studentAssets.samuele.finished[2]?.src,
  studentAssets.roya.finished[1]?.src,
  studentAssets.roya.finished[5]?.src,
  studentAssets.elena.finished[1]?.src,
  studentAssets.elena.finished[4]?.src,
  studentAssets.flavia.finished[0]?.src,
  studentAssets.flavia.finished[1]?.src
].filter(Boolean);

/** @type {string[]} */
const STUDENT_VETRINA = [
  ...(studentAssets.elena.vetrina ?? []),
  ...(studentAssets.flavia.vetrina ?? [])
];

/** @param {string[]} list */
function unique(list) {
  return [...new Set(list)];
}

/** Caroselli vetrina — solo static/vetrina e students (no placeholder) */
export const vetrinaSlides = unique(
  [...CURATED_MANIFEST, ...STUDENT_FINISHED, ...STUDENT_VETRINA].filter(
    (src) => src && !isPlaceholder(src)
  )
);
