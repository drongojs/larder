import React, { useState, useCallback } from 'react';
import Form from './Form';
import { enhance } from 'presentation/hocs';
import { useStock } from 'adapters/queries/stock';
import { useIngredient } from 'adapters/queries/ingredients';
import { useCategory } from 'adapters/queries/categories';
import { useId, parseSearch } from 'domain/selectors';
import { useAddQuantity } from 'adapters/actions/stock/xindex';
import { StockType } from 'domain/constants';

interface Props {
  onClose: () => any,
}

const ConnectedForm = ({ onClose }: Props) => {
  const id = useId();
  const {
    data: stock,
  } = useStock(
    {
      type: StockType.LARDER,
      id,
    },
    {
      suspense: true,
    },
  );
  const { data: category } = useCategory({ id: stock.category }, { suspense: true });
  const { data: ingredient } = useIngredient({ id: stock.id }, { suspense: true });
  const [ value, setValue ] = useState('');
  const [ mutate, { status } ] = useAddQuantity({
    id: stock.id,
    type: StockType.LARDER,
  });
  const onChange = useCallback((evt: any) => {
    setValue(evt.target.value);
  }, [ setValue ]);
  const {
    unit,
    quantity,
  } = parseSearch(value);
  
  const onSubmit = useCallback(async(positive: boolean) => {
    await mutate({
      unit,
      quantity: positive ? quantity : 0 - quantity,
    });

    onClose();
  }, [ mutate, id, unit, quantity ]);

  return (
    <Form
      id={stock.id}
      name={ingredient?.name ?? ''}
      quantity={stock.quantity}
      unit={ingredient?.unit ?? ''}
      category={category}
      hasOwnUnit={Boolean(unit)}
      value={value}
      status={status}
      onChange={onChange}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default enhance('ConnectedForm')(ConnectedForm);
