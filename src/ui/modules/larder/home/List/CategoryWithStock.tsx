import React from 'react';
import { Stock, Category } from 'domain/core';
import { ListHeader } from 'ui/elements/List';
import Items from './Items';
import { Resource } from '@drongo/recess';

interface Props {
  id: string,
  resource: Resource<Category[]>,
  stock: Stock[],
  onClick: (id: string) => void,
}

const CategoryWithStock = ({
  id,
  resource,
  stock,
  onClick,
}: Props) => {
  const category = resource.data.find((category) => category.id === id);
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
