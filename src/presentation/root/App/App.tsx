import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  Switch,
  Route,
} from 'react-router';
import {
  Provider as JpexProvider,
} from 'react-jpex';
import {
  ReactQueryConfigProvider,
} from 'react-query';
import baseJpex from 'jpex';
import Larder from 'presentation/pages/Larder';
import { enhance } from 'presentation/hocs';

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
        <Switch>
          <Route path="/larder">
            <Larder/>
          </Route>
        </Switch>
      </Router>
    </JpexProvider>
  </ReactQueryConfigProvider>
);

export default enhance('App')(App);
