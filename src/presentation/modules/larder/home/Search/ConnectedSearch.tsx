import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { enhance } from 'presentation/hocs';
import {
  useCreateStock,
  useAddQuantity,
} from 'application/actions/stock';
import { parseSearch } from 'domain/selectors';
import Search from './Search';
import { QueryStatus, QueryResult } from 'react-query';
import { Stock } from 'core';
import { StockType } from 'domain/constants';

interface Props {
  stockQuery: QueryResult<Stock[]>,
  value: string,
  onChange: (v: string) => void,
}

const ConnectedSearch = (props: Props) => {
  const [ waitingToSubmit, setWaitingToSubmit ] = useState(false);
  const [ create, { status: createStatus, reset: resetCreate } ] = useCreateStock();
  const [ update, { status: updateStatus, reset: resetUpdate} ] = useAddQuantity({
    type: StockType.LARDER,
    id: props.stockQuery.data?.[0]?.id,
  });
  const status = createStatus === QueryStatus.Idle ? updateStatus : createStatus;
  const {
    name,
    quantity,
    unit,
  } = useMemo(() => parseSearch(props.value), [ props.value ]);
  const {
    data: results,
    isFetching,
  } = props.stockQuery;

  const onSubmit = useCallback(async(evt?: any) => {
    evt?.preventDefault?.();
    if (isFetching) {
      setWaitingToSubmit(true);
      return;
    }
    if (status !== QueryStatus.Idle) {
      // already submitting
      return;
    }
    if (!name) {
      // trying to submit without a value
      return;
    }
    if (results?.length) {
      await update({
        quantity,
        unit,
      });
      resetUpdate();
    } else {
      await create({
        type: StockType.LARDER,
        name,
        quantity,
        unit,
      });
      resetCreate();
    }

    props.onChange('');
  }, [
    create,
    update,
    isFetching,
    results,
    quantity,
    unit,
    name,
    resetUpdate,
    resetCreate,
  ]);

  useEffect(() => {
    if (waitingToSubmit && !isFetching) {
      setWaitingToSubmit(false);
      onSubmit();
    }
  }, [ waitingToSubmit, isFetching, setWaitingToSubmit, onsubmit ]);

  return (
    <Search
      {...props}
      status={status}
      onSubmit={onSubmit}
    />
  );
};

export default enhance('ConnectedSearch')(ConnectedSearch);
