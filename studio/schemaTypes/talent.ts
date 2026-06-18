import { defineArrayMember, defineField, defineType } from 'sanity';

export const talent = defineType({
	name: 'talent',
	title: 'Talento / Studente',
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
			name: 'project',
			title: 'Titolo collezione / progetto',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'pitchIt',
			title: 'Pitch (IT)',
			type: 'text',
			rows: 4,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'pitchEn',
			title: 'Pitch (EN)',
			type: 'text',
			rows: 4
		}),
		defineField({
			name: 'portrait',
			title: 'Ritratto',
			type: 'image',
			options: { hotspot: true },
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'instagram',
			title: 'Instagram',
			type: 'url'
		}),
		defineField({
			name: 'concept',
			title: 'Concept',
			type: 'array',
			of: [defineArrayMember({ type: 'image', options: { hotspot: true } })]
		}),
		defineField({
			name: 'sketch',
			title: 'Sketch',
			type: 'array',
			of: [defineArrayMember({ type: 'image', options: { hotspot: true } })]
		}),
		defineField({
			name: 'finished',
			title: 'Pezzi finiti',
			type: 'array',
			of: [defineArrayMember({ type: 'image', options: { hotspot: true } })]
		}),
		defineField({
			name: 'vetrina',
			title: 'Vetrina',
			type: 'array',
			of: [defineArrayMember({ type: 'image', options: { hotspot: true } })]
		}),
		defineField({
			name: 'edition',
			title: 'Edizione',
			type: 'string',
			initialValue: '2025–26'
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
		select: { title: 'name', subtitle: 'project', media: 'portrait' }
	},
	orderings: [
		{
			title: 'Ordine',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }]
		}
	]
});
