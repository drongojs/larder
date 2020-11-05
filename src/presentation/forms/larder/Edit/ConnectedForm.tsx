import React, { useCallback } from 'react';
import Form from './Form';
import { enhance } from 'presentation/hocs';
import { useStock } from 'application/queries/stock';
import { useIngredient } from 'application/queries/ingredients';
import { useCategory } from 'application/queries/categories';
import { useId, parseSearch } from 'domain/selectors';
import { usePatchStock, useDeleteStock } from 'application/actions/stock';
import { useHistory } from 'react-router';
import { QueryStatus } from 'react-query';
import { StockType } from 'domain/constants';

const ConnectedForm = () => {
  const history = useHistory();
  const id = useId();
  const {
    data: stock,
  } = useStock(
    {
      id,
      type: StockType.LARDER,
    },
    {
      suspense: true,
    },
  );
  const { data: category } = useCategory(
    {
      id: stock.category,
    },
    {
      suspense: true,
    }
  );
  const { data: ingredient } = useIngredient(
    {
      id: stock.id,
    },
    {
      suspense: true,
    },
  );
  const [ mutate, { status: patchStatus } ] = usePatchStock();
  const [ deleteStock, { status: deleteStatus} ] = useDeleteStock();

  const status = patchStatus === QueryStatus.Idle ? deleteStatus : patchStatus;

  const onSubmit = useCallback(async(values: any) => {
    const {
      name,
      amount,
      category,
    } = values;
    const {
      quantity,
      unit,
    } = parseSearch(amount);
    // TODO: handle errors
    await mutate({
      type: StockType.LARDER,
      id,
      name,
      category,
      quantity,
      unit,
    });

    history.push('/larder');
  }, [ id, mutate, history ]);

  const onDelete = useCallback(async() => {
    await deleteStock({
      type: StockType.LARDER,
      id,
    });

    history.push('/larder');
  }, [ deleteStock, id, history ]);

  return (
    <Form
      id={stock.id}
      name={ingredient?.name ?? ''}
      quantity={stock.quantity}
      unit={ingredient?.unit ?? ''}
      category={category}
      status={status}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default enhance('ConnectedForm')(ConnectedForm);
