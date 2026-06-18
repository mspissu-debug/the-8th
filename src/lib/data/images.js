import assets from './student-assets.json';

export { heroSlides } from './hero-slides.js';

/** @param {string | { src: string }} item */
const src = (item) => (typeof item === 'string' ? item : item.src);

const s = assets.samuele;
const r = assets.roya;

export const samueleImages = {
  portrait: s.portrait,
  frattali: {
    cover: s.concept[0] ?? '',
    gallery: s.concept.slice(0, 4)
  },
  luce: {
    cover: s.sketch[0] ?? '',
    gallery: s.sketch.slice(0, 4)
  },
  pattern: {
    cover: src(s.finished[0]) ?? '',
    gallery: s.finished.slice(0, 4).map(src)
  }
};

export const royaImages = {
  portrait: r.portrait,
  gate: {
    cover: src(r.finished[0]),
    gallery: [r.concept[0], r.sketch[0], src(r.finished[1])].filter(Boolean)
  },
  innovazione: {
    cover: src(r.finished[2]),
    gallery: [r.concept[2], src(r.finished[3])].filter(Boolean)
  },
  rimozione: {
    cover: src(r.finished[4]),
    gallery: [r.sketch[3], src(r.finished[0])].filter(Boolean)
  }
};
