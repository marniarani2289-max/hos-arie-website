import {defineField, defineType} from 'sanity'

export const bookType = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
    defineField({name: 'year', title: 'Year', type: 'number'}),
    defineField({name: 'publisher', title: 'Publisher', type: 'string'}),
    defineField({name: 'coverImage', title: 'Cover Image', type: 'image'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'link', title: 'Link', type: 'url'}),
  ],
})