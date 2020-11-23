import React, { Suspense } from 'react';
import { Resource } from '@drongo/recess';
import { Stock, Category } from 'domain/core';
import Page from 'ui/modules/Page';
import EditForm from 'ui/forms/larder/Edit';
import ImageField from 'ui/modules/larder/edit/ImageField';
import PaddingBox from 'ui/elements/PaddingBox';
import NameField from 'ui/modules/larder/edit/NameField';
import AmountField from 'ui/modules/larder/edit/AmountField';
import CategoryField from 'ui/modules/larder/edit/CategoryField';
import { Spinner } from 'ui/elements/Progress';

interface Props {
  stockResource: Resource<Stock>,
  categoryResource: Resource<Category[]>,
  submitting: boolean,
  onSubmit: (...args: any[]) => any,
  onCreateCategory: (name: string) => any,
}

const Loader = (props: Parameters<typeof Spinner>[0]) => (
  <div style={{ textAlign: 'center' }}>
    <Spinner {...props}/>
  </div>
);

export default function Edit({
  stockResource,
  categoryResource,
  submitting,
  onSubmit,
  onCreateCategory,
}: Props) {
  return (
    <Page title="Edit">
      <Suspense fallback={<Loader/>}>
        <EditForm
          stockResource={stockResource}
          submitting={submitting}
          onSubmit={onSubmit}
        >
          <ImageField/>
          <PaddingBox top={1}>
            <NameField/>
          </PaddingBox>
          <PaddingBox top={1}>
            <AmountField/>
          </PaddingBox>
          <PaddingBox y={1}>
            <Suspense fallback={<Loader size="small"/>}>
              <CategoryField
                categoryResource={categoryResource}
                onCreate={onCreateCategory}
              />
            </Suspense>
          </PaddingBox>
        </EditForm>
      </Suspense>
    </Page>
  );
}
