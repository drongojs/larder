import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  Provider as JpexProvider,
} from 'react-jpex';
import {
  ReactQueryConfigProvider,
} from 'react-query';
import baseJpex from 'jpex';
import { enhance } from 'presentation/hocs';
import Core from './Core';

const jpex = baseJpex.extend({
  inherit: false,
  nodeModules: false,
  precedence: 'passive',
});

const App = () => (
  <ReactQueryConfigProvider
    config={{
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
      },
      mutations: {
        throwOnError: true,
      },
    }}
  >
    <JpexProvider value={jpex}>
      <Router>
        <Core/>
      </Router>
    </JpexProvider>
  </ReactQueryConfigProvider>
);

export default enhance('App')(App);
