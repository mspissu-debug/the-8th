import { error, redirect } from '@sveltejs/kit';
import { loadMentors } from '$lib/data/cms.server';
import { MENTOR_BY_ID } from '$lib/data/people';

export const prerender = true;

export async function entries() {
	const mentors = await loadMentors();
	const slugs = mentors.map((m) => ({ slug: m.slug }));
	const legacyIds = Object.keys(MENTOR_BY_ID).map((id) => ({ slug: id }));
	return [...slugs, ...legacyIds];
}

/** @param {import('./$types').PageServerLoadEvent} event */
export async function load({ params, parent }) {
	const legacy = MENTOR_BY_ID[params.slug];
	if (legacy && legacy.slug !== params.slug) {
		throw redirect(301, `/mentors/${legacy.slug}`);
	}

	const { mentors } = await parent();
	const mentor = mentors.find((m) => m.slug === params.slug);
	if (!mentor) throw error(404, 'Mentor non trovato');
	return { mentor };
}
