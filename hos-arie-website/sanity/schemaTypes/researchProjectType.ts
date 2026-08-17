import {defineField, defineType} from 'sanity'

export const researchProjectType = defineType({
  name: 'researchProject',
  title: 'Research Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Research Title',
      type: 'string',
    }),
    defineField({
      name: 'theme',
      title: 'Research Theme',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Ongoing', 'Completed', 'Planned'],
      },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'string',
    }),
    defineField({
      name: 'outputs',
      title: 'Expected Outputs',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
    }),
  ],
})