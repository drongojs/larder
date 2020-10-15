import React, { useState, useCallback } from 'react';
import Form from './Form';
import { enhance } from 'presentation/hocs';
import { useStock } from 'domain/queries/stock';
import { useIngredient } from 'domain/queries/ingredients';
import { useCategory } from 'domain/queries/categories';
import { useId, parseSearch } from 'domain/selectors';
import { useAddQuantity } from 'application/stock';

interface Props {
  onClose: () => any,
}

const ConnectedForm = ({ onClose }: Props) => {
  const id = useId();
  const {
    data: [
      stock,
    ] = [],
  } = useStock(
    {
      type: 'larder',
      id,
    },
    {
      suspense: true,
    },
  );
  const { data: category } = useCategory({ id: stock.category }, { suspense: true });
  const { data: ingredient } = useIngredient({ id: stock.id }, { suspense: true });
  const [ value, setValue ] = useState('');
  const [ mutate, { status } ] = useAddQuantity();
  const onChange = useCallback((evt: any) => {
    setValue(evt.target.value);
  }, [ setValue ]);
  const {
    unit,
    quantity,
  } = parseSearch(value);
  
  const onSubmit = useCallback(async(positive: boolean) => {
    await mutate({
      type: 'larder',
      id,
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
