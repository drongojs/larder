import React, { useEffect } from 'react';
import { MemoryRouter } from 'react-router';
import { Provider as JpexProvider } from 'react-jpex';
import { Read, Update as UpdateStock } from 'domain/core/stock';
import Update from '../ConnectedUpdate';

export default {
  title: 'screens/larder/update',
};

export const basic = () => {
  return (
    <JpexProvider
      onMount={jpex => {
        jpex.constant<Read>(({ id }) => {
          return Promise.resolve({
            id,
            name: 'Peas',
            categoryId: '',
            image: 'http://lorempixel.com/300/300/food/1',
            quantity: 500,
            unit: 'g',
          });
        });
        jpex.constant<UpdateStock>(() => {
          return new Promise(res => {
            setTimeout(res, 3000);
          });
        });
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
        <Update/>
      </MemoryRouter>
    </JpexProvider>
  );
};

export const loading = () => {
  return (
    <JpexProvider
      onMount={jpex => {
        jpex.constant<Read>(() => {
          return new Promise(() => {});
        });
        jpex.constant<UpdateStock>(() => {
          return new Promise(res => {
            setTimeout(res, 3000);
          });
        });
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
        <Update/>
      </MemoryRouter>
    </JpexProvider>
  );
};

export const submitting = () => {
  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      document.querySelector('#larder-update-submit').click();
    }, 50);
  }, []);

  return (
    <JpexProvider
      onMount={jpex => {
        jpex.constant<Read>(({ id }) => {
          return Promise.resolve({
            id,
            name: 'Peas',
            categoryId: '',
            image: 'http://lorempixel.com/300/300/food/1',
            quantity: 500,
            unit: 'g',
          });
        });
        jpex.constant<UpdateStock>(() => new Promise(() => {}));
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
        <Update/>
      </MemoryRouter>
    </JpexProvider>
  );
};
