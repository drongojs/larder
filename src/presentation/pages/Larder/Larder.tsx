import React from 'react';
import {
  Switch,
  Route,
} from 'react-router';
import Home from './Home';
import Update from './Update';
import Edit from './Edit';
import { enhance } from 'presentation/hocs';
import { Hidden } from '@material-ui/core';

const Larder = () => (
  <Switch>
    <Route path="/larder" exact={true}>
      <Home/>
    </Route>
    <Route path="/larder/:id" exact={true}>
      <>
        <Hidden smUp>
          <Update/>
        </Hidden>
        <Hidden mdDown>
          <Home/>
        </Hidden>
      </>
    </Route>
    <Route path="/larder/:id/edit" exact={true}>
      <Edit/>
    </Route>
  </Switch>
);

export default enhance('Larder')(Larder);
