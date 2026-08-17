import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Academic Portal')
    .items([
      S.documentTypeListItem('news').title('News'),
      S.documentTypeListItem('opinion').title('Opinions'),
      S.documentTypeListItem('publication').title('Publications'),
      S.documentTypeListItem('book').title('Books'),
      S.documentTypeListItem('event').title('Conferences & Talks'),
      S.documentTypeListItem('media').title('Media Coverage'),
      S.documentTypeListItem('gallery').title('Gallery'),
    ])