/// <reference types="@sveltejs/kit" />

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
		plausible?: (event: string, options?: { u?: string }) => void;
	}
}

export {};
