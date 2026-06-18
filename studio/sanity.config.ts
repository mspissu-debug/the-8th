import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

if (!projectId) {
	console.warn(
		'[THE 8th Studio] Imposta SANITY_STUDIO_PROJECT_ID in studio/.env (vedi .env.example).'
	);
}

export default defineConfig({
	name: 'the-8th',
	title: 'THE 8th · Admin',
	projectId: projectId || 'replace-me',
	dataset,
	plugins: [structureTool(), visionTool()],
	schema: {
		types: schemaTypes
	}
});
