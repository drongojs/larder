import React from 'react';
import { StaticQuery } from '@drongo/respite/mocks';
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
          categoryQuery={new StaticQuery({
            data: [
              {
                id: 'f',
                name: 'Frozen',
              },
            ],
          })}
          stockQuery={new StaticQuery({
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
          categoryQuery={new StaticQuery({
            data: [
              {
                id: 'f',
                name: 'Frozen',
              },
            ],
          })}
          stockQuery={new StaticQuery({
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
          categoryQuery={new StaticQuery({
            data: [
              {
                id: 'f',
                name: 'Frozen',
              },
            ],
          })}
          stockQuery={new StaticQuery()}
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
          categoryQuery={new StaticQuery()}
          stockQuery={new StaticQuery({
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
