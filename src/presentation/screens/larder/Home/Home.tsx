import React, { Suspense } from 'react';
import Page from 'presentation/modules/Page';
import Search from 'presentation/modules/larder/home/Search';
import List, { ListPending } from 'presentation/modules/larder/home/List';
import renderOptions from 'presentation/modules/larder/home/Options';
import UpdateModal from 'presentation/modules/larder/update/Modal';
import { enhance } from 'presentation/hocs';
import { Filter } from 'domain/core/larder';
import { QueryResult } from 'react-query';
import { Stock } from 'domain/core';

interface Props {
  id?: string,
  filter: Filter,
  grouped: boolean,
  search: string,
  setFilter: (v: Filter) => void,
  toggleGrouped: () => void,
  setSearch: (v: string) => void,
  stockQuery: QueryResult<Stock[]>,
  onCloseModal: () => any,
}

const Home = ({
  id,
  filter,
  grouped,
  search,
  setFilter,
  toggleGrouped,
  setSearch,
  stockQuery,
  onCloseModal,
}: Props) => (
  <Page
    options={renderOptions({
      filter,
      grouped,
      setFilter,
      toggleGrouped,
    })}
  >
    <Search
      value={search}
      onChange={setSearch}
      stockQuery={stockQuery}
    />
    <Suspense fallback={<ListPending/>}>
      <List
        stockQuery={stockQuery}
        grouped={grouped}
        filter={filter}
      />
    </Suspense>
    {id != null && (
      <UpdateModal onClose={onCloseModal}/>
    )}
  </Page>
);

export default enhance('Home')(Home);
