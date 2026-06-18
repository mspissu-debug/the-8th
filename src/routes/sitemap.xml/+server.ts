import { SITE_URL } from '$lib/seo';
import { loadMentors, loadShowcases } from '$lib/data/cms.server';

export const prerender = true;

export async function GET() {
	const [mentors, showcases] = await Promise.all([loadMentors(), loadShowcases()]);

	const paths = [
		'',
		'/open-call',
		'/contact',
		'/cookie-policy',
		'/mentors',
		'/students',
		'/editions/previous',
		'/editions/september',
		...mentors.map((m) => `/mentors/${m.slug}`),
		...showcases.map((s) => `/students/${s.slug}`)
	];

	const base = SITE_URL.replace(/\/$/, '');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
	.map(
		(p) => `  <url>
    <loc>${base}${p || '/'}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '' ? '1.0' : '0.8'}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
