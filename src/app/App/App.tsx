import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  Switch,
  Route,
} from 'react-router';
import Larder from 'larder/Routes';

const App = () => (
  <Router>
    <Switch>
      <Route path="/larder">
        <Larder/>
      </Route>
    </Switch>
  </Router>
);
App.displayName = 'App';

export default App;
