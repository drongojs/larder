import React, { Suspense } from 'react';
import { Query } from '@drongo/respite';
import { Stock, Category } from 'domain/core';
import Page from 'ui/modules/Page';
import EditForm from '../Form';
import ImageField from '../ImageField';
import NameField from '../NameField';
import AmountField from '../AmountField';
import CategoryField from '../CategoryField';
import { Spinner } from 'ui/elements/Progress';
import { css, cx } from 'linaria';
import { queries } from 'ui/theme';
import Buttons from '../Buttons';

interface Props {
  stockQuery: Query<Stock>,
  categoryQuery: Query<Category[]>,
  submitting: boolean,
  onSubmit: (...args: any[]) => any,
  onCreateCategory: (name: string) => any,
}

const styles = {
  root: css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    ${queries.desktopOnly} {
      flex-direction: row;
      flex-grow: 0;
    }
  `,
  loader: css`
    text-align: center;
  `,
  fields: css`
    ${queries.desktopOnly} {
      width: 60%;
      margin-left: 1rem;
    }
  `,
  field: css`
    padding-top: 1rem;
  `,
  trail: css`
    padding-bottom: 2rem;
    ${queries.tabletUp} {
      padding-bottom: 4rem;
    }
  `,
};

const Loader = (props: Parameters<typeof Spinner>[0]) => (
  <div className={styles.loader}>
    <Spinner {...props}/>
  </div>
);

export default function Screen({
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
          stockQuery={stockQuery}
          className={styles.root}
          onSubmit={onSubmit}
        >
          <ImageField/>
          <div className={styles.fields}>
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
            <Buttons
              stockQuery={stockQuery}
              submitting={submitting}
            />
          </div>
        </EditForm>
      </Suspense>
    </Page>
  );
}
