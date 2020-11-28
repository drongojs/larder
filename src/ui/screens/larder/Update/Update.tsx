import React, { Suspense } from 'react';
import Page from 'ui/modules/Page';
import Header from 'ui/modules/larder/update/Header';
import { css } from 'linaria';
import { Query, Status } from '@drongo/respite';
import { Stock } from 'domain/core';
import { Spinner } from 'ui/elements/Progress';
import UpdateForm from 'ui/forms/larder/Update';
import { Flex } from 'ui/elements/Flex';

interface Props {
  query: Query<Stock>,
  submitting: boolean,
  onSubmit: (...args: any[]) => any,
}

const styles = {
  loading: css`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  `,
};

const Loading = () => (
  <Flex justify="center" align="center" className={styles.loading}>
    <Spinner/>
  </Flex>
);

const UpdateScreen = ({
  query,
  submitting,
  onSubmit,
}: Props) => {
  const title = query.status === Status.SUCCESS ? query.data.name : '...';
  return (
    <Page title={title}>
      <Suspense fallback={<Loading/>}>
        <Header query={query}/>
        <UpdateForm
          query={query}
          submitting={submitting}
          onSubmit={onSubmit}
        />
        <If condition={submitting}>
          <Loading/>
        </If>
      </Suspense>
    </Page>
  );
};

export default UpdateScreen;
