import React, { Suspense } from 'react';
import Search from 'ui/modules/larder/home/Search';
import List, { ListLoading } from 'ui/modules/larder/home/List';
import Page from 'ui/modules/Page';
import { Resource } from '@drongo/recess';
import { Stock, Category } from 'domain/core';
import { css } from 'linaria';

interface Props {
  search: string,
  submitting: boolean,
  stockResource: Resource<Stock[]>,
  categoryResource: Resource<Category[]>,
  onSearch: (v: string) => void,
  onSubmit: (v: string) => void,
  onClick: (id: string) => void,
}

const styles = {
  list: css`
    flex-grow: 1;
    margin-top: 1rem;
  `,
};

const Home = ({
  search,
  submitting,
  stockResource,
  categoryResource,
  onSearch,
  onSubmit,
  onClick,
}: Props) => (
  <Page title="Larder">
    <div>
      <Search
        value={search}
        onChange={onSearch}
        onSubmit={onSubmit}
        submitting={submitting}
      />
    </div>
    <div className={styles.list}>
      <Suspense fallback={<ListLoading/>}>
        <List
          stockResource={stockResource}
          categoryResource={categoryResource}
          onClick={onClick}
        />
      </Suspense>
    </div>
  </Page>
);

export default Home;
