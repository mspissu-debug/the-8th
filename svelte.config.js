import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		prerender: {
			handleHttpError: ({ path, message }) => {
				if (path === '/cookie-policy') return;
				throw new Error(message);
			},
			handleMissingId: () => 'ignore'
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			strict: false
		}),
		paths: {
			base: process.env.BASE_PATH ?? ''
		}
	}
};

export default config;
