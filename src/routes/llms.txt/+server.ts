import { buildLlmsTxt } from '$lib/seo/llms-txt';
import { loadMentors, loadShowcases } from '$lib/data/cms.server';

export const prerender = true;

export async function GET() {
	const [mentors, showcases] = await Promise.all([loadMentors(), loadShowcases()]);
	const body = buildLlmsTxt(mentors, showcases);

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
