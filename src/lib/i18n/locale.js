import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'the8-locale';

/** @type {import('svelte/store').Writable<'it' | 'en'>} */
export const locale = writable('it');

/** @param {'it' | 'en'} next */
export function setLocale(next) {
  locale.set(next);
  if (browser) {
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute('lang', next);
  }
}

export function initLocale() {
  if (!browser) return;
  const saved = localStorage.getItem(STORAGE_KEY);
  const value = saved === 'en' ? 'en' : 'it';
  locale.set(value);
  document.documentElement.setAttribute('lang', value);
}
