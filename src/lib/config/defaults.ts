import type { SiteConfig } from './types';
import { INDIGO, GRAPE, SKY, BLACK } from '$lib/theme';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
	students: {
		'1': {
			accent: INDIGO,
			heroBand: 'light',
			showRings: true,
			titleSize: 'lg',
			quoteVisible: true
		},
		'2': {
			accent: GRAPE,
			heroBand: 'soft',
			showRings: true,
			titleSize: 'md',
			quoteVisible: true
		},
		'3': {
			accent: SKY,
			heroBand: 'light',
			showRings: false,
			titleSize: 'md',
			quoteVisible: true
		},
		'4': {
			accent: BLACK,
			heroBand: 'dark',
			showRings: true,
			titleSize: 'lg',
			quoteVisible: true
		}
	},
	editions: {
		previous: {
			accent: INDIGO,
			heroBand: 'light',
			showStats: true,
			galleryColumns: 3
		},
		september: {
			accent: GRAPE,
			heroBand: 'soft',
			showStats: true,
			galleryColumns: 2
		}
	}
};
