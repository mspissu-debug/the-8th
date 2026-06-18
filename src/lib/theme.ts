export const BLACK = '#020312';
export const INDIGO = '#3D268F';
export const GRAPE = '#7254D8';
export const SKY = '#4DA3F7';
export const WHITE = '#FFF9FC';

export const MENTOR_NOTES = ['OREFICERIA', 'GEMMOLOGIA', 'INCASTONATURA', 'DESIGN'] as const;
export const STUDENT_COLORS = [INDIGO, GRAPE, SKY, BLACK] as const;
export const PAIR_ACCENTS = [INDIGO, GRAPE, SKY, '#A978E8'] as const;

export function pairColor(id: string | number): string {
	const n = Number(id);
	if (!Number.isFinite(n) || n < 1 || n > PAIR_ACCENTS.length) return PAIR_ACCENTS[0];
	return PAIR_ACCENTS[n - 1];
}
