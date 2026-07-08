import {defineField, defineType} from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
    }),
    defineField({name: 'summary', title: 'Summary', type: 'text'}),
    defineField({name: 'coverImage', title: 'Cover Image', type: 'image'}),
    defineField({name: 'publishedAt', title: 'Published At', type: 'datetime'}),
    defineField({name: 'body', title: 'Body', type: 'array', of: [{type: 'block'}]}),
  ],
})