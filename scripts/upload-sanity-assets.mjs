/**
 * Carica in Sanity ritratto mentor e gallerie talenti da static/ + student-assets.json.
 * Richiede SANITY_API_WRITE_TOKEN in .env
 *
 * Uso: npm run sanity:upload-assets
 */
import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { basename, join } from 'path';
import { mentors } from '../src/lib/data/mentors.js';
import assets from '../src/lib/data/student-assets.json' with { type: 'json' };

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
const root = join(process.cwd(), 'static');

if (!projectId) throw new Error('Missing PUBLIC_SANITY_PROJECT_ID');
if (!token) throw new Error('Missing SANITY_API_WRITE_TOKEN');

const client = createClient({
	projectId,
	dataset,
	apiVersion: '2025-06-15',
	useCdn: false,
	token
});

/** @param {string} webPath es. /mentors/crivelli.webp */
function localPath(webPath) {
	return join(root, webPath.replace(/^\//, ''));
}

/** @param {string} filePath */
async function uploadFile(filePath) {
	const buffer = readFileSync(filePath);
	return client.assets.upload('image', buffer, { filename: basename(filePath) });
}

/** @param {import('@sanity/client').SanityAssetDocument} asset */
function imageRef(asset) {
	return {
		_type: 'image',
		asset: { _type: 'reference', _ref: asset._id }
	};
}

/** @param {string[]} webPaths */
async function uploadGallery(webPaths) {
	/** @type {ReturnType<typeof imageRef>[]} */
	const refs = [];
	for (const webPath of webPaths) {
		const path = localPath(webPath);
		if (!existsSync(path)) {
			console.warn(`  skip (missing): ${webPath}`);
			continue;
		}
		const asset = await uploadFile(path);
		refs.push(imageRef(asset));
	}
	return refs;
}

/** @param {unknown[] | string[] | undefined} list */
function pathsFromAssetList(list) {
	if (!list?.length) return [];
	return list
		.map((item) => {
			if (typeof item === 'string') return item;
			if (item && typeof item === 'object' && 'src' in item) {
				return /** @type {{ src: string }} */ (item).src;
			}
			return null;
		})
		.filter((src) => src && !src.startsWith('/placeholders/'));
}

console.log('Upload mentor portraits…');
for (const mentor of mentors) {
	const path = localPath(mentor.image);
	if (!existsSync(path)) {
		console.warn(`  ${mentor.slug}: file not found ${mentor.image}`);
		continue;
	}
	const asset = await uploadFile(path);
	await client
		.patch(`mentor.${mentor.slug}`)
		.set({ portrait: imageRef(asset) })
		.commit();
	console.log(`  ✓ ${mentor.name}`);
}

console.log('\nUpload talent galleries…');
for (const [slug, data] of Object.entries(assets)) {
	const portraitPath = data.portrait ? localPath(data.portrait) : null;
	const patch = client.patch(`talent.${slug}`);

	if (portraitPath && existsSync(portraitPath)) {
		const asset = await uploadFile(portraitPath);
		patch.set({ portrait: imageRef(asset) });
	}

	const concept = await uploadGallery(pathsFromAssetList(data.concept));
	const sketch = await uploadGallery(pathsFromAssetList(data.sketch));
	const finished = await uploadGallery(pathsFromAssetList(data.finished));
	const vetrina = await uploadGallery(pathsFromAssetList(data.vetrina));

	if (concept.length) patch.set({ concept });
	if (sketch.length) patch.set({ sketch });
	if (finished.length) patch.set({ finished });
	if (vetrina.length) patch.set({ vetrina });

	await patch.commit();
	console.log(`  ✓ ${slug} (portrait${concept.length ? ', concept' : ''}${sketch.length ? ', sketch' : ''}${finished.length ? ', finished' : ''}${vetrina.length ? ', vetrina' : ''})`);
}

console.log('\nFatto. Esegui npm run sanity:status per verificare.');
