import { createClient } from '@sanity/client';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import { mentorsQuery, talentsQuery } from './queries';
import type { SanityMentorDoc, SanityTalentDoc } from './map';

function createSanityServerClient() {
	const projectId = publicEnv.PUBLIC_SANITY_PROJECT_ID;
	if (!projectId || projectId === 'your-project-id') return null;

	return createClient({
		projectId,
		dataset: publicEnv.PUBLIC_SANITY_DATASET || 'production',
		apiVersion: publicEnv.PUBLIC_SANITY_API_VERSION || '2025-06-15',
		useCdn: false,
		token: privateEnv.SANITY_API_READ_TOKEN
	});
}

export async function fetchMentorsFromSanity(): Promise<SanityMentorDoc[] | null> {
	const client = createSanityServerClient();
	if (!client) return null;

	try {
		return await client.fetch<SanityMentorDoc[]>(mentorsQuery);
	} catch (err) {
		console.warn('[Sanity] fetch mentors failed:', err);
		return null;
	}
}

export async function fetchTalentsFromSanity(): Promise<SanityTalentDoc[] | null> {
	const client = createSanityServerClient();
	if (!client) return null;

	try {
		return await client.fetch<SanityTalentDoc[]>(talentsQuery);
	} catch (err) {
		console.warn('[Sanity] fetch talents failed:', err);
		return null;
	}
}
