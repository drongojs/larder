import { staticQuery } from '@respite/mocks';
import React from 'react';
import Screen from './Screen';
export { default } from './ConnectedScreen.stories';

export const loading = () => (
  <div>
    <Screen
      search=""
      submitting={false}
      stockQuery={staticQuery()}
      categoryQuery={staticQuery()}
      onSearch={() => {}}
      onSubmit={() => {}}
      onClick={() => {}}
    />
  </div>
);

export const submitting = () => (
  <div>
    <Screen
      search=""
      submitting={true}
      stockQuery={staticQuery()}
      categoryQuery={staticQuery()}
      onSearch={() => {}}
      onSubmit={() => {}}
      onClick={() => {}}
    />
  </div>
);

export const singleCategory = () => (
  <div>
    <Screen
      search=""
      submitting={false}
      stockQuery={staticQuery({
        data: [
          {
            id: 'peas',
            categoryId: 'frozen',
            quantity: 500,
            unit: 'g',
            name: 'Peas',
            image: 'https://picsum.photos/id/488/300/300',
          },
          {
            id: 'chips',
            categoryId: 'frozen',
            quantity: 500,
            unit: 'g',
            name: 'Chips',
            image: 'https://picsum.photos/id/488/300/300',
          },
        ],
      })}
      categoryQuery={staticQuery()}
      onSearch={() => {}}
      onSubmit={() => {}}
      onClick={() => {}}
    />
  </div>
);


export const multiCategories = () => (
  <div>
    <Screen
      search=""
      submitting={false}
      stockQuery={staticQuery({
        data: [
          {
            id: 'peas',
            categoryId: 'frozen',
            quantity: 500,
            unit: 'g',
            name: 'Peas',
            image: 'https://picsum.photos/id/488/300/300',
          },
          {
            id: 'carrots',
            categoryId: 'veg',
            quantity: 500,
            unit: 'g',
            name: 'Carrots',
            image: 'https://picsum.photos/id/488/300/300',
          },
        ],
      })}
      categoryQuery={staticQuery({
        data: [
          {
            id: 'veg',
            name: 'Veg',
          },
        ],
      })}
      onSearch={() => {}}
      onSubmit={() => {}}
      onClick={() => {}}
    />
  </div>
);
