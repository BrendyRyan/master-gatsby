import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdStore as icon } from 'react-icons/md';

// build a custom sidebar in Sanity Studio

export default function sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create a new sub item
      S.listItem().title('Home Page').icon(icon).child(
        S.editor()
          .schemaType('storeSettings')
          // make a new document ID so we don't have a random string of numbers
          .documentId('downtown')
      ),
      // add in the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
