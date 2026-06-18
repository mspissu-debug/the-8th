/** Placeholder statici — persone (ritratti/sketch) e gioiello (concept/finished/vetrina) */

export const PERSON = [
  '/placeholders/person-01.webp',
  '/placeholders/person-02.webp',
  '/placeholders/person-03.webp'
];

export const JEWELRY = [
  '/placeholders/jewelry-01.webp',
  '/placeholders/jewelry-02.webp',
  '/placeholders/jewelry-03.webp'
];

/** @param {number} n */
export function personSlides(n = 3) {
  return Array.from({ length: n }, (_, i) => PERSON[i % PERSON.length]);
}

/** @param {number} n */
export function jewelrySlides(n = 3) {
  return Array.from({ length: n }, (_, i) => JEWELRY[i % JEWELRY.length]);
}

/** @param {string} path */
export function isPlaceholder(path) {
  return path.includes('/placeholders/');
}
