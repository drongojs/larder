import React from 'react';
import { Switch, Route } from 'react-router';
import Home from 'ui/screens/larder/Home';
import Update from 'ui/screens/larder/Update';

const Larder = () => (
  <Switch>
    <Route path="/larder" exact={true}>
      <Home/>
    </Route>
    <Route path="/larder/:id" exact={true}>
      <Update/>
    </Route>
  </Switch>
);

export default Larder;
