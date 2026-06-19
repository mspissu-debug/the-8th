import { env } from '$env/dynamic/public';

/** URL dello Studio Sanity ospitato (dopo `npm run studio:deploy`). */
export const DEFAULT_SANITY_STUDIO_URL = 'https://the-8th-cms.sanity.studio';

export function getSanityStudioUrl() {
	const configured = env.PUBLIC_SANITY_STUDIO_URL?.trim();
	if (configured) return configured.replace(/\/$/, '');
	return DEFAULT_SANITY_STUDIO_URL;
}
