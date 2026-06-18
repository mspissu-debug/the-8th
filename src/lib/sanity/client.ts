import { createClient } from '@sanity/client';
import { env } from '$env/dynamic/public';

/** Client Sanity per fetch lato server / build. */
export function createSanityClient() {
	const projectId = env.PUBLIC_SANITY_PROJECT_ID;
	if (!projectId || projectId === 'your-project-id') {
		return null;
	}

	return createClient({
		projectId,
		dataset: env.PUBLIC_SANITY_DATASET || 'production',
		apiVersion: env.PUBLIC_SANITY_API_VERSION || '2025-06-15',
		useCdn: true
	});
}

export function isSanityConfigured() {
	const projectId = env.PUBLIC_SANITY_PROJECT_ID;
	return Boolean(projectId) && projectId !== 'your-project-id';
}
