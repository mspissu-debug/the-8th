import { fetchMentorsFromSanity, fetchTalentsFromSanity } from '$lib/sanity/fetch.server';
import { mapSanityMentor, mapSanityTalent } from '$lib/sanity/map';
import { mentors as staticMentors } from './mentors.js';
import { getBuiltinShowcases, getBuiltinTalentEntries } from './showcase-registry.js';

type Mentor = (typeof staticMentors)[number];

function mergeMentors(sanityMentors: ReturnType<typeof mapSanityMentor>[]): Mentor[] {
	const bySlug = new Map(staticMentors.map((m) => [m.slug, m]));
	for (const mapped of sanityMentors) {
		const existing = bySlug.get(mapped.slug);
		bySlug.set(mapped.slug, { ...existing, ...mapped } as Mentor);
	}
	return [...bySlug.values()].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

function mergeShowcases(sanityTalents: ReturnType<typeof mapSanityTalent>[]) {
	const staticShowcases = getBuiltinShowcases();
	const bySlug = new Map(staticShowcases.map((s) => [s.slug, s]));

	for (const mapped of sanityTalents) {
		const existing = bySlug.get(mapped.slug);
		if (existing) {
			bySlug.set(mapped.slug, {
				...existing,
				...mapped,
				skin: existing.skin,
				projects: existing.projects,
				projectDetails: existing.projectDetails,
				source: existing.source
			});
		} else {
			bySlug.set(mapped.slug, {
				...mapped,
				skin: mapped.skin || 'default',
				source: 'custom'
			});
		}
	}

	return [...bySlug.values()];
}

export async function loadMentors(): Promise<Mentor[]> {
	const docs = await fetchMentorsFromSanity();
	if (!docs?.length) return staticMentors;
	return mergeMentors(docs.map(mapSanityMentor));
}

export async function loadShowcases() {
	const docs = await fetchTalentsFromSanity();
	if (!docs?.length) return getBuiltinShowcases();
	return mergeShowcases(docs.map(mapSanityTalent));
}

type Showcase = Awaited<ReturnType<typeof loadShowcases>>[number];

export function loadTalentEntries(showcases: Showcase[]) {
	return showcases.map((s) => ({
		slug: s.slug,
		href: `/students/${s.slug}`,
		name: s.name,
		project: s.project,
		portrait: s.portrait,
		image: s.portrait
	}));
}

/** Shortcut quando serve solo l’elenco statico + eventuale Sanity. */
export async function loadTalentEntriesFromCms() {
	const showcases = await loadShowcases();
	return loadTalentEntries(showcases);
}

/** Per compatibilità con codice che importava solo i builtin. */
export function getBuiltinTalentEntriesList() {
	return getBuiltinTalentEntries();
}
