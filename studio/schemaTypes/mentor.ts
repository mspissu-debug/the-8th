import { defineField, defineType } from 'sanity';

export const mentor = defineType({
	name: 'mentor',
	title: 'Mentor',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Nome',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug URL',
			type: 'slug',
			options: { source: 'name', maxLength: 96 },
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'roleIt',
			title: 'Ruolo (IT)',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'roleEn',
			title: 'Ruolo (EN)',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'bioIt',
			title: 'Bio (IT)',
			type: 'text',
			rows: 5,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'bioEn',
			title: 'Bio (EN)',
			type: 'text',
			rows: 5,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'portrait',
			title: 'Ritratto',
			type: 'image',
			options: { hotspot: true },
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'website',
			title: 'Sito web',
			type: 'url'
		}),
		defineField({
			name: 'order',
			title: 'Ordine in lista',
			type: 'number',
			initialValue: 0
		}),
		defineField({
			name: 'published',
			title: 'Pubblicato',
			type: 'boolean',
			initialValue: true
		})
	],
	preview: {
		select: { title: 'name', subtitle: 'roleIt', media: 'portrait' }
	},
	orderings: [
		{
			title: 'Ordine',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }]
		}
	]
});
