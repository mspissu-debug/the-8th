/**
 * Progress 0–1 mentre l’elemento attraversa la viewport (sticky storytelling).
 * @param {DOMRect} rect
 * @param {number} scrollHeight extra oltre 100vh (es. 1.5 = 250vh totali)
 */
export function sectionProgress(rect, scrollHeight = 1.65) {
  const viewport = window.innerHeight;
  const total = viewport * scrollHeight;
  const scrolled = -rect.top;
  if (total <= viewport) return scrolled <= 0 ? 0 : 1;
  return Math.min(1, Math.max(0, scrolled / (total - viewport)));
}

/** Crossfade tra N immagini in base a progress. @returns {number[]} */
export function imageOpacities(progress, count) {
  if (count <= 1) return [1];
  const segment = 1 / (count - 1);
  return Array.from({ length: count }, (_, i) => {
    const center = i * segment;
    const dist = Math.abs(progress - center) / segment;
    return Math.max(0, 1 - dist * 0.85);
  });
}
