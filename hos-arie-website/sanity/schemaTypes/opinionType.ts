import {defineField, defineType} from 'sanity'

export const opinionType = defineType({
  name: 'opinion',
  title: 'Opinion',
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
    defineField({name: 'topic', title: 'Topic', type: 'string'}),
    defineField({name: 'coverImage', title: 'Cover Image', type: 'image'}),
    defineField({name: 'publishedAt', title: 'Published At', type: 'datetime'}),
    defineField({name: 'body', title: 'Body', type: 'array', of: [{type: 'block'}]}),
  ],
})