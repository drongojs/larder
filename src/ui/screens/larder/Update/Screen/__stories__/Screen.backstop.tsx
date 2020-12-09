import { StaticQuery } from '@drongo/respite/mocks';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Screen from '../Screen';
export { default } from './Update.stories';

export const backstop = () => (
  <MemoryRouter>
    <div>
      <div style={{ height: 200 }}>
        {/* loading */}
        <Screen
          query={new StaticQuery()}
          submitting={false}
          onSubmit={() => {}}
        />
      </div>
      <div>
        {/* populated */}
        <Screen
          query={new StaticQuery({
            data: {
              id: 'peas',
              categoryId: 'frozen',
              quantity: 500,
              unit: 'g',
              name: 'Peas',
              image: 'http://lorempixel.com/100/100/food/1',
            },
          })}
          submitting={false}
          onSubmit={() => {}}
        />
      </div>
      <div>
        {/* submitting */}
        <Screen
          query={new StaticQuery({
            data: {
              id: 'peas',
              categoryId: 'frozen',
              quantity: 500,
              unit: 'g',
              name: 'Peas',
              image: 'http://lorempixel.com/100/100/food/1',
            },
          })}
          submitting={true}
          onSubmit={() => {}}
        />
      </div>
    </div>
  </MemoryRouter>
);
