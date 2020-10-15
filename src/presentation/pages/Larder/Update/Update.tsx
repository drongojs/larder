import React, {
  Suspense,
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import UpdateScreen from 'presentation/screens/larder/Update';
import PageLoading from 'presentation/modules/PageLoading';
import PageError from 'presentation/modules/PageError';
import { enhance } from 'presentation/hocs';


const UpdatePage = () => (
  <ErrorBoundary FallbackComponent={PageError}>
    <Suspense fallback={<PageLoading/>}>
      <UpdateScreen/>
    </Suspense>
  </ErrorBoundary>
);

export default enhance('UpdatePage')(UpdatePage);
