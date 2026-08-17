import {defineField, defineType} from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({name: 'caption', title: 'Caption', type: 'text'}),
    defineField({name: 'date', title: 'Date', type: 'date'}),
  ],
})