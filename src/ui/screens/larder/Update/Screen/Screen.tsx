import React, { Suspense } from 'react';
import Page from 'ui/modules/Page';
import Header from '../Header';
import { css } from 'linaria';
import { Query, Status } from '@drongo/respite';
import { Stock } from 'domain/core';
import { Spinner } from 'ui/elements/Progress';
import UpdateForm from '../Form';
import { Flex } from 'ui/elements/Flex';
import { queries } from 'ui/theme';

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
  root: css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    
    ${queries.desktopOnly} {
      flex-direction: row;
      flex-grow: 0;
    }
  `,
};

const Loading = () => (
  <Flex justify="center" align="center" className={styles.loading}>
    <Spinner/>
  </Flex>
);

const Screen = ({
  query,
  submitting,
  onSubmit,
}: Props) => {
  const title = query.status === Status.SUCCESS ? query.data.name : '...';
  return (
    <Page title={title}>
      <Suspense fallback={<Loading/>}>
        <div className={styles.root}>
          <Header query={query}/>
          <UpdateForm
            query={query}
            submitting={submitting}
            onSubmit={onSubmit}
          />
        </div>
        <If condition={submitting}>
          <Loading/>
        </If>
      </Suspense>
    </Page>
  );
};

export default Screen;
