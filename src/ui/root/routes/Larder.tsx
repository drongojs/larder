import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'ui/screens/larder/Home';
import Update from 'ui/screens/larder/Update';
import Edit from 'ui/screens/larder/Edit';

const Larder = () => (
  <Switch>
    <Route path="/larder" exact={true}>
      <Home/>
    </Route>
    <Route path="/larder/:id" exact={true}>
      <Update/>
    </Route>
    <Route path="/larder/:id/edit" exact={true}>
      <Edit/>
    </Route>
  </Switch>
);

export default Larder;
