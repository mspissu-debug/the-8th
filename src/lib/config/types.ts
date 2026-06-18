export type StudentPageStyle = {
	accent: string;
	heroBand: 'light' | 'dark' | 'soft';
	showRings: boolean;
	titleSize: 'sm' | 'md' | 'lg';
	quoteVisible: boolean;
};

export type EditionPageStyle = {
	accent: string;
	heroBand: 'light' | 'dark' | 'soft';
	showStats: boolean;
	galleryColumns: 2 | 3;
};

export type SiteConfig = {
	students: Record<string, StudentPageStyle>;
	editions: {
		previous: EditionPageStyle;
		september: EditionPageStyle;
	};
};
