import { studentImagePool, studentMedia, filterStudent, uniqueUrls } from './home-media.js';

/**
 * @param {import('./showcase-registry.js').StudentShowcase[]} showcases
 */
export function buildStoryTalentsFromShowcases(showcases) {
  return showcases.map((talent) => {
    const m = studentMedia(talent.slug);
    const poolFromAssets = studentImagePool(talent.slug);
    const poolFromShowcase = uniqueUrls([
      ...filterStudent(talent.finished),
      ...filterStudent(talent.sketch),
      ...filterStudent(talent.concept)
    ]);
    const images = poolFromAssets.length ? poolFromAssets : poolFromShowcase;
    // Come home-story.js: cover da URL stringhe filtrate, non da oggetti { src } grezzi
    const cover = m.portrait ?? talent.portrait ?? images[0] ?? '';

    return {
      slug: talent.slug,
      name: talent.name,
      project: talent.project,
      href: `/students/${talent.slug}`,
      portrait: m.portrait ?? talent.portrait,
      cover,
      images
    };
  });
}
