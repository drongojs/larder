import React, { Suspense } from 'react';
import Page from 'ui/modules/Page';
import Header from '../Header';
import { css } from 'linaria';
import { Query, Status } from '@respite/query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Stock } from 'domain/core';
import { Spinner } from 'ui/elements/Progress';
import UpdateForm from '../Form';
import { Flex } from 'ui/elements/Flex';
import { queries } from 'ui/theme';
import Button from 'ui/elements/Button';

interface Props {
  query: Query<Stock>,
  submitting: boolean,
  error: any,
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
  error: css`
    text-align: center;
  `,
  errorText: css`
    padding-bottom: 2rem;
    font-size: 2rem;
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

const Error = (props: FallbackProps) => {
  const text = props.error?.message ?? 'Something bad happened y\'all!';
  return (
    <div className={styles.error}>
      <div className={styles.errorText}>{text}</div>
      <Button onClick={props.resetErrorBoundary}>Retry</Button>
    </div>
  );
};

const Screen = ({
  query,
  submitting,
  error,
  onSubmit,
}: Props) => {
  const title = query.status === Status.SUCCESS ? query.data.name : '...';
  return (
    <Page title={title}>
      <Suspense fallback={<Loading/>}>
        <ErrorBoundary
          FallbackComponent={Error}
          onReset={() => query.invalidate({ exact: true })}
        >
          <div className={styles.root}>
            <Header query={query}/>
            <UpdateForm
              query={query}
              submitting={submitting}
              error={error}
              onSubmit={onSubmit}
            />
          </div>
          <If condition={submitting}>
            <Loading/>
          </If>
        </ErrorBoundary>
      </Suspense>
    </Page>
  );
};

export default Screen;
