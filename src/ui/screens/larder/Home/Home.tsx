import React, { Suspense } from 'react';
import Search from 'ui/modules/larder/home/Search';
import List, { ListLoading } from 'ui/modules/larder/home/List';
import Page from 'ui/modules/Page';
import { Query } from '@drongo/respite';
import { Stock, Category } from 'domain/core';
import { css } from 'linaria';
import PaddingBox from 'ui/elements/PaddingBox';

interface Props {
  search: string,
  submitting: boolean,
  stockQuery: Query<Stock[]>,
  categoryQuery: Query<Category[]>,
  onSearch: (v: string) => void,
  onSubmit: (v: string) => void,
  onClick: (id: string) => void,
}

const styles = {
  list: css`
    flex-grow: 1;
  `,
};

const Home = ({
  search,
  submitting,
  stockQuery,
  categoryQuery,
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
    <PaddingBox top={1} className={styles.list}>
      <Suspense fallback={<ListLoading/>}>
        <List
          stockQuery={stockQuery}
          categoryQuery={categoryQuery}
          onClick={onClick}
        />
      </Suspense>
    </PaddingBox>
  </Page>
);

export default Home;
