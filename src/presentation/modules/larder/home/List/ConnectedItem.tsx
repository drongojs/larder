import React from 'react';
import { Stock } from 'domain/core';
import { Filter } from 'domain/core/larder';
import { usePatchStock } from 'adapters/actions/stock/xindex';
import { useCategory } from 'adapters/queries/categories';
import { useIngredient } from 'adapters/queries/ingredients';
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
