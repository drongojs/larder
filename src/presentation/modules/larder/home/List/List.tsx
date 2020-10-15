import React, { Suspense } from 'react';
import { List as MuiList } from '@material-ui/core';
import { Stock } from 'core';
import Item from './ConnectedItem';
import ItemPending from './ItemPending';
import { enhance } from 'presentation/hocs';
import { Filter } from 'core/larder';

interface Props {
  stock: Stock[],
  filter: Filter,
}

const List = ({ stock, filter }: Props) => {
  return (
    <MuiList>
      {stock.map((stock) => (
        <Suspense key={stock.id} fallback={<ItemPending/>}>
          <Item
            filter={filter}
            {...stock}
          />
        </Suspense>
      ))}
    </MuiList>
  );
};

export default enhance('List')(List);
