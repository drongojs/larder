import React, { useEffect } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider as JpexProvider } from 'react-jpex';
import { IStockService } from 'ports/stock';
import ConnectedScreen from './ConnectedScreen';
import Screen from './Screen';
import { Entity } from 'ports/entity';
import { Stock } from 'domain/core';
import { after } from 'crosscutting/utils';
import { StaticQuery } from '@drongo/respite/mocks';

export default {
  title: 'screens/larder/Update/Screen',
};

export const basic = () => {
  return (
    <Screen
      onSubmit={() => {}}
      submitting={false}
      query={new StaticQuery({
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
      onSubmit={() => {}}
      submitting={false}
      query={new StaticQuery()}
    />
  );
};

export const submitting = () => {
  return (
    <Screen
      query={new StaticQuery({
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

// export const connected = () => {
//   return (
//     <JpexProvider
//       onMount={jpex => {
//         class StockService extends Entity<Stock> implements IStockService {
//           stock: Stock = {
//             id: 'peas',
//             name: 'Peas',
//             categoryId: '',
//             image: 'https://picsum.photos/id/488/300/300',
//             quantity: 500,
//             unit: 'g',
//           };
        
//           search(): any {}
//           read() {
//             return after(250, this.stock);
//           }
//           update() {
//             return after(3000, this.stock);
//           }
//         }
//         jpex.service(StockService);
//       }}
//     >
//       <MemoryRouter
//         initialEntries={[
//           {
//             pathname: '/larder/peas',
//             state: {
//               id: 'peas',
//             },
//           },
//         ]}
//       >
//         <Update/>
//       </MemoryRouter>
//     </JpexProvider>
//   );
// };
