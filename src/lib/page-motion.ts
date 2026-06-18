import type { RevealVariant } from '$lib/reveal';

/** Varianti alternate per le sezioni in scroll */
export const SECTION_VARIANTS: RevealVariant[] = [
	'clip-up',
	'clip-left',
	'clip-right',
	'fade',
	'blur',
	'scale',
	'skew-in',
	'rotate-in'
];

export function sectionVariant(index: number): RevealVariant {
	return SECTION_VARIANTS[index % SECTION_VARIANTS.length];
}

export const STAGGER_VARIANTS = ['', 'left', 'right', 'scale'] as const;

export function staggerVariant(index: number): (typeof STAGGER_VARIANTS)[number] {
	return STAGGER_VARIANTS[index % STAGGER_VARIANTS.length];
}
