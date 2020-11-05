import React from 'react';
import { Stock } from 'core';
import { Filter } from 'core/larder';
import { usePatchStock } from 'application/actions/stock';
import { useCategory } from 'application/queries/categories';
import { useIngredient } from 'application/queries/ingredients';
import { enhance } from 'presentation/hocs';
import Item from './Item';

interface Props extends Stock {
  filter: Filter,
}

const ConnectedItem = (stock: Props) => {
  const { data: ingredient } = useIngredient({ id: stock.id }, { suspense: true });
  const { data: category } = useCategory({ id: stock.category }, { suspense: true });
  const [ patch ] = usePatchStock();
  const handleClear = () => {
    patch({
      type: stock.type,
      id: stock.id,
      quantity: 0,
    });
  };

  return (
    <Item
      id={stock.id}
      category={category}
      name={ingredient?.name ?? ''}
      quantity={stock.quantity}
      unit={ingredient?.unit}
      filter={stock.filter}
      onClear={handleClear}
    />
  );
};

export default enhance('ConnectedItem')(ConnectedItem);
