import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Conference & Talk',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'eventName', title: 'Event Name', type: 'string'}),
    defineField({name: 'date', title: 'Date', type: 'date'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
  ],
})