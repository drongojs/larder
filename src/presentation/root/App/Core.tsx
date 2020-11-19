import React from 'react';
import {
  Switch,
  Route,
} from 'react-router';
import Larder from 'presentation/pages/Larder';
import { enhance } from 'presentation/hocs';
import driverDi from 'ports/driver';
import { useRegister } from 'react-jpex';

const Core = () => {
  useRegister(driverDi);

  return (
    <Switch>
      <Route path="/larder">
        <Larder/>
      </Route>
    </Switch>
  );
};

export default enhance('Core')(Core);
