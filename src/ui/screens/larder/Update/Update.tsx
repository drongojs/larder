import React, { Suspense } from 'react';
import Page from 'ui/modules/Page';
import Header from 'ui/modules/larder/update/Header';
import { css } from 'linaria';
import { Resource, Status } from '@drongo/recess';
import { Stock } from 'domain/core';
import { Spinner } from 'ui/elements/Progress';
import UpdateForm from 'ui/forms/larder/Update';

interface Props {
  resource: Resource<Stock>,
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
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const Loading = () => (
  <div className={styles.loading}>
    <Spinner/>
  </div>
);

const UpdateScreen = ({
  resource,
  submitting,
  onSubmit,
}: Props) => {
  const title = resource.status === Status.SUCCESS ? resource.data.name : '...';
  return (
    <Page title={title}>
      <Suspense fallback={<Loading/>}>
        <Header resource={resource}/>
        <UpdateForm
          resource={resource}
          submitting={submitting}
          onSubmit={onSubmit}
        />
        {submitting && <Loading/>}
      </Suspense>
    </Page>
  );
};

export default UpdateScreen;
