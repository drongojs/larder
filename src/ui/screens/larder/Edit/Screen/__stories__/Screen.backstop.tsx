import React from 'react';
import { StaticQuery } from '@drongo/respite/mocks';
import { MemoryRouter } from 'react-router-dom';
import Screen from '../Screen';
export { default } from './ConnectedScreen.stories';

// category loading
export const backstop = () => {
  return (
    <MemoryRouter>
      <div>
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
                image: 'http://lorempixel.com/100/100/food/1',
                quantity: 500,
                unit: 'g',
              },
            })}
          />
        </div>
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
                image: 'http://lorempixel.com/100/100/food/1',
                quantity: 500,
                unit: 'g',
              },
            })}
          />
        </div>
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
            stockQuery={new StaticQuery({})}
          />
        </div>
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
                image: 'http://lorempixel.com/100/100/food/1',
                quantity: 500,
                unit: 'g',
              },
            })}
          />
        </div>
      </div>
    </MemoryRouter>
  );
};
