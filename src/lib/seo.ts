import type { Locale } from '$lib/i18n';
import { tFor } from '$lib/i18n';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? 'https://the8.example.com';

/** Imposta a false quando il sito deve essere indicizzato dai motori di ricerca. */
export const SITE_NOINDEX = true;

export type SeoMeta = {
	title: string;
	description: string;
	path?: string;
	image?: string;
	type?: 'website' | 'article';
	noindex?: boolean;
};

export function fullTitle(title: string, locale: Locale = 'it'): string {
	const site = tFor(locale).seo.siteName;
	return title.includes(site) ? title : `${title} — ${site}`;
}

export function canonicalUrl(path = ''): string {
	const base = SITE_URL.replace(/\/$/, '');
	const p = path.startsWith('/') ? path : `/${path}`;
	return `${base}${p}`;
}

export function defaultMeta(locale: Locale = 'it'): SeoMeta {
	const m = tFor(locale);
	return {
		title: m.seo.siteName,
		description: m.seo.defaultDescription,
		path: '/',
		type: 'website'
	};
}

export const ROUTE_SEO: Record<string, SeoMeta> = {
	'/': {
		title: 'THE 8th — International Jewelry Design Contest',
		description:
			'Programma annuale di gioielleria contemporanea: 4 studenti, 4 mentori, 12 mesi di atelier in Italia.',
		path: '/'
	},
	'/contact': {
		title: 'Contact',
		description: 'Contatta THE 8th — candidature, partnership, informazioni sul programma.',
		path: '/contact'
	},
	'/mentors': {
		title: 'Mentori',
		description: 'I quattro mentori di THE 8th — oreficeria, gemmologia, incastonatura, design.',
		path: '/mentors'
	},
	'/students': {
		title: 'Studenti',
		description: 'I quattro studenti di THE 8th e i loro portfolio in corso.',
		path: '/students'
	},
	'/editions/previous': {
		title: 'Edizione 01',
		description: 'Archivio della prima edizione di THE 8th — tema, coppie, mostra.',
		path: '/editions/previous'
	},
	'/editions/september': {
		title: 'Edizione 02 — Settembre',
		description: 'Edizione in corso di THE 8th — settembre 2026, tema e calendario.',
		path: '/editions/september'
	},
	'/cookie-policy': {
		title: 'Cookie Policy',
		description: 'Informazioni su cookie tecnici e preferenze salvate nel browser.',
		path: '/cookie-policy'
	}
};

export function mentorSeo(id: string): SeoMeta {
	return {
		title: `Mentore ${id}`,
		description: `Profilo mentore ${id} — THE 8th International Jewelry Design Contest.`,
		path: `/mentors/${id}`,
		type: 'article'
	};
}

export function studentSeo(id: string): SeoMeta {
	return {
		title: `Studente ${id}`,
		description: `Portfolio studente ${id} — THE 8th International Jewelry Design Contest.`,
		path: `/students/${id}`,
		type: 'article'
	};
}

export function resolveSeo(pathname: string): SeoMeta {
	if (pathname.startsWith('/mentors/')) return mentorSeo(pathname.split('/').pop() ?? '1');
	if (pathname.startsWith('/students/')) return studentSeo(pathname.split('/').pop() ?? '1');
	return ROUTE_SEO[pathname] ?? defaultMeta();
}

export { SITE_URL };
