import { loadMentors, loadShowcases, loadTalentEntries } from '$lib/data/cms.server';

export const prerender = true;

export async function load() {
	const [mentors, showcases] = await Promise.all([loadMentors(), loadShowcases()]);
	const talents = loadTalentEntries(showcases);

	return { mentors, showcases, talents };
}
