import { StaticQuery } from '@drongo/respite/mocks';
import React from 'react';
import Screen from '../Screen';
export { default } from './ConnectedScreen.stories';

export const backstop = () => (
  <div>
    <div>
      {/* loading */}
      <Screen
        search=""
        submitting={false}
        stockQuery={new StaticQuery()}
        categoryQuery={new StaticQuery()}
        onSearch={() => {}}
        onSubmit={() => {}}
        onClick={() => {}}
      />
    </div>
    <div>
      {/* submitting */}
      <Screen
        search=""
        submitting={true}
        stockQuery={new StaticQuery()}
        categoryQuery={new StaticQuery()}
        onSearch={() => {}}
        onSubmit={() => {}}
        onClick={() => {}}
      />
    </div>
    <div>
      {/* single category */}
      <Screen
        search=""
        submitting={false}
        stockQuery={new StaticQuery({
          data: [
            {
              id: 'peas',
              categoryId: 'frozen',
              quantity: 500,
              unit: 'g',
              name: 'Peas',
              image: 'http://lorempixel.com/100/100/food/1',
            },
            {
              id: 'chips',
              categoryId: 'frozen',
              quantity: 500,
              unit: 'g',
              name: 'Chips',
              image: 'http://lorempixel.com/100/100/food/1',
            },
          ],
        })}
        categoryQuery={new StaticQuery()}
        onSearch={() => {}}
        onSubmit={() => {}}
        onClick={() => {}}
      />
    </div>
    <div>
      {/* multiple categories */}
      <Screen
        search=""
        submitting={false}
        stockQuery={new StaticQuery({
          data: [
            {
              id: 'peas',
              categoryId: 'frozen',
              quantity: 500,
              unit: 'g',
              name: 'Peas',
              image: 'http://lorempixel.com/100/100/food/1',
            },
            {
              id: 'carrots',
              categoryId: 'veg',
              quantity: 500,
              unit: 'g',
              name: 'Carrots',
              image: 'http://lorempixel.com/100/100/food/1',
            },
          ],
        })}
        categoryQuery={new StaticQuery({
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
  </div>
);
