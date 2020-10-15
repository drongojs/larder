import React, {
  Suspense,
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import EditScreen from 'presentation/screens/larder/Edit';
import PageLoading from 'presentation/modules/PageLoading';
import PageError from 'presentation/modules/PageError';
import { enhance } from 'presentation/hocs';


const EditPage = () => (
  <ErrorBoundary FallbackComponent={PageError}>
    <Suspense fallback={<PageLoading/>}>
      <EditScreen/>
    </Suspense>
  </ErrorBoundary>
);

export default enhance('EditPage')(EditPage);
