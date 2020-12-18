import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('ui/screens/larder/Home'));
const Update = lazy(() => import('ui/screens/larder/Update'));
const Edit = lazy(() => import('ui/screens/larder/Edit'));

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
