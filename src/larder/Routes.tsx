import React from 'react';
import {
  Switch,
  Route,
} from 'react-router';
import { Home } from './home';
import { Update } from './update';
import { Edit } from './edit';

const Routes = () => (
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

export default Routes;
