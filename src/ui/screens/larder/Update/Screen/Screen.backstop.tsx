import { StaticQuery } from '@drongo/respite/mocks';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Screen from './Screen';
export { default } from './Screen.stories';

export const loading = () => (
  <MemoryRouter>
    <div>
      <div style={{ height: 200 }}>
        <Screen
          query={new StaticQuery()}
          submitting={false}
          onSubmit={() => {}}
        />
      </div>
    </div>
  </MemoryRouter>
);

export const populated = () => (
  <MemoryRouter>
    <div>
      <Screen
        query={new StaticQuery({
          data: {
            id: 'peas',
            categoryId: 'frozen',
            quantity: 500,
            unit: 'g',
            name: 'Peas',
            image: 'https://picsum.photos/id/488/300/300',
          },
        })}
        submitting={false}
        onSubmit={() => {}}
      />
    </div>
  </MemoryRouter>
);

export const submitting = () => (
  <MemoryRouter>
    <div>
      <Screen
        query={new StaticQuery({
          data: {
            id: 'peas',
            categoryId: 'frozen',
            quantity: 500,
            unit: 'g',
            name: 'Peas',
            image: 'https://picsum.photos/id/488/300/300',
          },
        })}
        submitting={true}
        onSubmit={() => {}}
      />
    </div>
  </MemoryRouter>
);
