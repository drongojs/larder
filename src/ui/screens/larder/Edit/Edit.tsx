import React, { Suspense } from 'react';
import { Query } from '@drongo/respite';
import { Stock, Category } from 'domain/core';
import Page from 'ui/modules/Page';
import EditForm from 'ui/forms/larder/Edit';
import ImageField from 'ui/modules/larder/edit/ImageField';
import NameField from 'ui/modules/larder/edit/NameField';
import AmountField from 'ui/modules/larder/edit/AmountField';
import CategoryField from 'ui/modules/larder/edit/CategoryField';
import { Spinner } from 'ui/elements/Progress';
import { css, cx } from 'linaria';
import { desktopUp } from 'ui/theme';

interface Props {
  stockQuery: Query<Stock>,
  categoryQuery: Query<Category[]>,
  submitting: boolean,
  onSubmit: (...args: any[]) => any,
  onCreateCategory: (name: string) => any,
}

const styles = {
  loader: css`
    text-align: center;
  `,
  field: css`
    padding-top: 1rem;

    ${desktopUp()} {
      width: 50%;
      margin: auto;
      padding-top: 2rem;
    }
  `,
  trail: css`
    padding-bottom: 2rem;
  `,
};

const Loader = (props: Parameters<typeof Spinner>[0]) => (
  <div className={styles.loader}>
    <Spinner {...props}/>
  </div>
);

export default function Edit({
  stockQuery,
  categoryQuery,
  submitting,
  onSubmit,
  onCreateCategory,
}: Props) {
  return (
    <Page title="Edit">
      <Suspense fallback={<Loader/>}>
        <EditForm
          stockResource={stockQuery}
          submitting={submitting}
          onSubmit={onSubmit}
        >
          <ImageField/>
          <div className={styles.field}>
            <NameField/>
          </div>
          <div className={styles.field}>
            <AmountField/>
          </div>
          <div className={cx(styles.field, styles.trail)}>
            <Suspense fallback={<Loader size="small"/>}>
              <CategoryField
                query={categoryQuery}
                onCreate={onCreateCategory}
              />
            </Suspense>
          </div>
        </EditForm>
      </Suspense>
    </Page>
  );
}
