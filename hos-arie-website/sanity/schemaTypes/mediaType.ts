import {defineField, defineType} from 'sanity'

export const mediaType = defineType({
  name: 'media',
  title: 'Media Coverage',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'mediaName', title: 'Media Name', type: 'string'}),
    defineField({name: 'date', title: 'Date', type: 'date'}),
    defineField({name: 'summary', title: 'Summary', type: 'text'}),
    defineField({name: 'link', title: 'Link', type: 'url'}),
  ],
})