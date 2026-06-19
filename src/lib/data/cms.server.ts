import { fetchMentorsFromSanity, fetchTalentsFromSanity } from '$lib/sanity/fetch.server';
import { mapSanityMentor, mapSanityTalent } from '$lib/sanity/map';

export type CmsMentor = ReturnType<typeof mapSanityMentor>;
export type CmsShowcase = ReturnType<typeof mapSanityTalent>;

export type EditionPair = {
	studentSlug: string;
	studentName: string;
	studentProject: string;
	studentPortrait: string;
	mentorSlug: string;
	mentorName: string;
	mentorImage: string;
};

/** Coppie edizione da ordine CMS (talenti × mentor). */
export function buildEditionPairs(showcases: CmsShowcase[], mentors: CmsMentor[]): EditionPair[] {
	const students = [...showcases].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
	const orderedMentors = [...mentors].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

	return students.map((student, i) => {
		const mentor = orderedMentors[i];
		return {
			studentSlug: student.slug,
			studentName: student.name,
			studentProject: student.project ?? '',
			studentPortrait: student.portrait ?? '',
			mentorSlug: mentor?.slug ?? '',
			mentorName: mentor?.name ?? '',
			mentorImage: mentor?.image ?? mentor?.portrait ?? ''
		};
	});
}

/** Mentor — solo Sanity Studio. */
export async function loadMentors(): Promise<CmsMentor[]> {
	const docs = await fetchMentorsFromSanity();
	if (!docs?.length) {
		console.warn(
			'[THE 8th · Sanity] Nessun mentor pubblicato. Aggiungi contenuti in Studio o verifica SANITY_API_READ_TOKEN.'
		);
		return [];
	}
	return docs.map(mapSanityMentor);
}

/** Talenti / showcase — solo Sanity Studio. */
export async function loadShowcases(): Promise<CmsShowcase[]> {
	const docs = await fetchTalentsFromSanity();
	if (!docs?.length) {
		console.warn(
			'[THE 8th · Sanity] Nessun talento pubblicato. Aggiungi contenuti in Studio o verifica SANITY_API_READ_TOKEN.'
		);
		return [];
	}
	return docs.map(mapSanityTalent);
}

export function loadTalentEntries(showcases: CmsShowcase[]) {
	return showcases.map((s) => ({
		slug: s.slug,
		href: `/students/${s.slug}`,
		name: s.name,
		project: s.project ?? '',
		portrait: s.portrait,
		image: s.portrait
	}));
}

export async function loadTalentEntriesFromCms() {
	const showcases = await loadShowcases();
	return loadTalentEntries(showcases);
}
