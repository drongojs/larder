import React, {
  Suspense,
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import HomeScreen from 'presentation/screens/larder/Home';
import PageLoading from 'presentation/modules/PageLoading';
import PageError from 'presentation/modules/PageError';
import { enhance } from 'presentation/hocs';


const HomePage = () => (
  <ErrorBoundary FallbackComponent={PageError}>
    <Suspense fallback={<PageLoading/>}>
      <HomeScreen/>
    </Suspense>
  </ErrorBoundary>
);

export default enhance('HomePage')(HomePage);
