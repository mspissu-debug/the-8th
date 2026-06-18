import { browser } from '$app/environment';
import { derived, get, writable } from 'svelte/store';
import { translate } from './story-messages.js';
import it from './locales/it';
import en from './locales/en';

export type Locale = 'it' | 'en';

export type Messages = {
	lang: Locale;
	nav: Record<string, string>;
	footer: Record<string, string>;
	home: Record<string, string>;
	mentors: Record<string, string>;
	students: Record<string, string>;
	editions: Record<string, string>;
	contact: Record<string, string>;
	admin: Record<string, string>;
	seo: Record<string, string>;
};

const locales: Record<Locale, Messages> = { it: it as Messages, en: en as Messages };
const STORAGE_KEY = 'the8-locale';

function detectInitial(): Locale {
	if (browser) {
		const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
		if (stored && locales[stored]) return stored;
	}
	return 'it';
}

export const locale = writable<Locale>(detectInitial());

export const messages = derived(locale, ($l) => locales[$l]);

/** Traduzione a chiavi puntate (storytelling Matteo, navbar, footer story) */
export const t = derived(locale, ($l) => (key: string) => translate($l, key));

export function initLocale(): void {
	const l = detectInitial();
	locale.set(l);
	if (browser) document.documentElement.lang = l;
}

export function setLocale(next: Locale): void {
	if (!locales[next]) return;
	locale.set(next);
	if (browser) {
		localStorage.setItem(STORAGE_KEY, next);
		document.documentElement.lang = next;
	}
}

export function getLocale(): Locale {
	return get(locale);
}

/** Messaggi tipizzati per pagine Michele (admin, mentor index, …) */
export function getMessages(): Messages {
	return locales[get(locale)];
}

export function tFor(l: Locale): Messages {
	return locales[l];
}

export const LOCALE_LABELS: Record<Locale, string> = {
	it: 'IT',
	en: 'EN'
};
