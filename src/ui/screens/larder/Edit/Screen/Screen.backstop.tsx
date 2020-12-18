import React from 'react';
import { staticQuery } from '@respite/mocks';
import { MemoryRouter } from 'react-router-dom';
import Screen from './Screen';
export { default } from './ConnectedScreen.stories';

export const populated = () => {
  return (
    <MemoryRouter>
      <div>
        <Screen
          onSubmit={() => {}}
          submitting={false}
          onCreateCategory={() => {}}
          categoryQuery={staticQuery({
            data: [
              {
                id: 'f',
                name: 'Frozen',
              },
            ],
          })}
          stockQuery={staticQuery({
            data: {
              id: 'p',
              categoryId: 'f',
              name: 'Peas',
              image: 'https://picsum.photos/id/488/300/300',
              quantity: 500,
              unit: 'g',
            },
          })}
        />
      </div>
    </MemoryRouter>
  );
};

export const submitting = () => {
  return (
    <MemoryRouter>
      <div>
        <Screen
          onSubmit={() => {}}
          submitting={true}
          onCreateCategory={() => {}}
          categoryQuery={staticQuery({
            data: [
              {
                id: 'f',
                name: 'Frozen',
              },
            ],
          })}
          stockQuery={staticQuery({
            data: {
              id: 'p',
              categoryId: 'f',
              name: 'I am submitting',
              image: 'https://picsum.photos/id/488/300/300',
              quantity: 500,
              unit: 'g',
            },
          })}
        />
      </div>
    </MemoryRouter>
  );
};

export const loading = () => {
  return (
    <MemoryRouter>
      <div>
        <Screen
          onSubmit={() => {}}
          submitting={false}
          onCreateCategory={() => {}}
          categoryQuery={staticQuery({
            data: [
              {
                id: 'f',
                name: 'Frozen',
              },
            ],
          })}
          stockQuery={staticQuery()}
        />
      </div>
    </MemoryRouter>
  );
};

export const categoryLoading = () => {
  return (
    <MemoryRouter>
      <div>
        <Screen
          onSubmit={() => {}}
          submitting={false}
          onCreateCategory={() => {}}
          categoryQuery={staticQuery()}
          stockQuery={staticQuery({
            data: {
              id: 'p',
              categoryId: 'f',
              name: 'Waiting for categories...',
              image: 'https://picsum.photos/id/488/300/300',
              quantity: 500,
              unit: 'g',
            },
          })}
        />
      </div>
    </MemoryRouter>
  );
};
