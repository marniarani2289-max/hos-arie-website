import {defineField, defineType} from 'sanity'

export const publicationType = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'journal',
      title: 'Journal / Publisher',
      type: 'string',
    }),

    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),

    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'string',
    }),

    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'url',
    }),

    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
    }),

    defineField({
      name: 'pdf',
      title: 'PDF File',
      type: 'file',
    }),
  ],
})