import React, { useMemo } from 'react';
import { useStock } from 'domain/queries/stock';
import { enhance } from 'presentation/hocs';
import { Filter } from 'core/larder';
import List from './List';
import GroupList from './GroupList';
import { parseSearch } from 'domain/selectors';
import { QueryResult, QueryStatus } from 'react-query';
import { Stock } from 'core';

interface Props {
  filter: Filter,
  grouped: boolean,
  stockQuery: QueryResult<Stock[]>,
}

const ConnectedList = ({
  filter,
  grouped,
  stockQuery,
}: Props) => {
  const {
    data: stock,
    isFetching,
  } = stockQuery;
  
  if (isFetching) {
    throw new Promise(() => {});
  }

  if (grouped) {
    return (
      <GroupList
        filter={filter}
        stock={stock ?? []}
      />
    );
  }

  return (
    <List filter={filter} stock={stock ?? []}/>
  );
};

export default enhance('ConnectedList')(ConnectedList);
