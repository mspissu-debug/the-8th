import { loadMentors, loadShowcases, loadTalentEntries, buildEditionPairs } from '$lib/data/cms.server';

export const prerender = true;

export async function load() {
	const [mentors, showcases] = await Promise.all([loadMentors(), loadShowcases()]);
	const talents = loadTalentEntries(showcases);
	const editionPairs = buildEditionPairs(showcases, mentors);

	return { mentors, showcases, talents, editionPairs };
}
