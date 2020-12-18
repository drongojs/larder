import React from 'react';
import Screen from './Screen';
import { staticQuery } from '@respite/mocks';
import { MemoryRouter, Route } from 'react-router';
import { Provider as JpexProvider } from 'react-jpex';
import { Provider as Respite } from '@respite/query';
import { Entity } from 'ports/entity';
import { Stock } from 'domain/core';
import { IStockService } from 'ports/stock';
import { after } from 'crosscutting/utils';
import ConnectedScreen from './ConnectedScreen';

export default {
  title: 'screens/larder/Update/Screen',
  decorators: [
    (Story: any) => (
      <MemoryRouter>
        <Story/>
      </MemoryRouter>
    ),
  ],
};

export const basic = () => {
  return (
    <Screen
      onSubmit={() => {}}
      submitting={false}
      error={null}
      query={staticQuery({
        data: {
          id: 'peas',
          name: 'Peas',
          categoryId: '',
          image: 'https://picsum.photos/id/488/300/300',
          quantity: 500,
          unit: 'g',
        },
      })}
    />
  );
};

export const loading = () => {
  return (
    <Screen
      error={null}
      onSubmit={() => {}}
      submitting={false}
      query={staticQuery()}
    />
  );
};

export const submitting = () => {
  return (
    <Screen
      error={null}
      query={staticQuery({
        data: {
          id: 'peas',
          name: 'Peas',
          categoryId: '',
          image: 'https://picsum.photos/id/488/300/300',
          quantity: 500,
          unit: 'g',
        },
      })}
      submitting={true}
      onSubmit={() => {}}
    />
  );
};

export const error = () => {
  return (
    <Screen
      query={staticQuery({
        data: {
          id: 'peas',
          name: 'Peas',
          categoryId: '',
          image: 'https://picsum.photos/id/488/300/300',
          quantity: 500,
          unit: 'g',
        },
      })}
      submitting={false}
      error={new Error('it broke')}
      onSubmit={() => {}}
    />
  );
};

export const connected = (props: { loadError: boolean, submitError: boolean }) => {
  return (
    <JpexProvider
      onMount={jpex => {
        class StockService extends Entity<Stock> implements IStockService {
          stock: Stock = {
            id: 'peas',
            name: 'Peas',
            categoryId: '',
            image: 'https://picsum.photos/id/488/300/300',
            quantity: 500,
            unit: 'g',
          };
        
          search(): any {}
          async read() {
            await after(1000);
            if (props.loadError) {
              throw new Error('something went wrong');
            }
            return this.stock;
          }
          async update() {
            await after(3000);
            if (props.submitError) {
              throw new Error('something went wrong');
            }
            return this.stock;
          }
        }
        jpex.service(StockService);
      }}
    >
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/larder/peas',
            state: {
              id: 'peas',
            },
          },
        ]}
      >
        <Route path="/larder/:id">
          <Respite key={JSON.stringify(props)}>
            <ConnectedScreen/>
          </Respite>
        </Route>
      </MemoryRouter>
    </JpexProvider>
  );
};
connected.args = {
  loadError: false,
  submitError: false,
};
