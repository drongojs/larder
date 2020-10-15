import React from 'react';
import { useCategory } from 'domain/queries/categories';
import { ListSubheader } from '@material-ui/core';
import { Stock } from 'core';
import { enhance } from 'presentation/hocs';
import Item from './ConnectedItem';
import { Filter } from 'core/larder';

interface Props {
  id: string,
  stock: Stock[],
  filter: Filter,
}

const Group = ({ id, stock, filter }: Props) => {
  const { data: category } = useCategory({ id }, { suspense: true });

  return (
    <li>
      <ul
        style={{
          listStyle: 'none',
          padding: 'inherit',
        }}
      >
        <ListSubheader>{category?.name ?? 'Unknown'}</ListSubheader>
        {stock.map((stock) => (
          <Item
            key={stock.id}
            filter={filter}
            {...stock}
          />
        ))}
      </ul>
    </li>
  );
};

export default enhance('Group')(Group);
