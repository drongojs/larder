import React from 'react';
import { Stock, Category } from 'domain/core';
import { ListHeader } from 'ui/elements/List';
import Items from './Items';
import { Query } from '@respite/query';

interface Props {
  id: string,
  query: Query<Category[]>,
  stock: Stock[],
  onClick: (id: string) => void,
}

const CategoryWithStock = ({
  id,
  query,
  stock,
  onClick,
}: Props) => {
  const category = query.data.find(category => category.id === id);
  const name = category?.name || id || 'Misc';

  return (
    <>
      <ListHeader>
        <span style={{ fontSize: '1.5rem' }}>
          {name}
        </span>
      </ListHeader>
      <Items
        stock={stock}
        onClick={onClick}
      />
    </>
  );
};

export default CategoryWithStock;
