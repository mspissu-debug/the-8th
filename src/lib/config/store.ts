import { browser } from '$app/environment';
import { DEFAULT_SITE_CONFIG } from './defaults';
import type { SiteConfig } from './types';

const STORAGE_KEY = 'the8-site-config';

function mergeConfig(partial: Partial<SiteConfig>): SiteConfig {
	return {
		students: { ...DEFAULT_SITE_CONFIG.students, ...partial.students },
		editions: {
			previous: { ...DEFAULT_SITE_CONFIG.editions.previous, ...partial.editions?.previous },
			september: { ...DEFAULT_SITE_CONFIG.editions.september, ...partial.editions?.september }
		}
	};
}

export function loadSiteConfig(): SiteConfig {
	if (!browser) return DEFAULT_SITE_CONFIG;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return DEFAULT_SITE_CONFIG;
		return mergeConfig(JSON.parse(raw) as Partial<SiteConfig>);
	} catch {
		return DEFAULT_SITE_CONFIG;
	}
}

export function saveSiteConfig(config: SiteConfig): void {
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function resetSiteConfig(): void {
	if (!browser) return;
	localStorage.removeItem(STORAGE_KEY);
}

export function exportSiteConfig(): string {
	return JSON.stringify(loadSiteConfig(), null, 2);
}

export function importSiteConfig(json: string): boolean {
	try {
		const parsed = JSON.parse(json) as Partial<SiteConfig>;
		saveSiteConfig(mergeConfig(parsed));
		return true;
	} catch {
		return false;
	}
}
