import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router';
import { useTransition, animated } from 'react-spring';
import Larder from './Larder';

const Routes = () => {
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    from: {
      position: 'absolute',
      width: '100%',
      opacity: 0,
      transform: 'translate3d(100%,0,0)',
      height: '100%',
    },
    enter: {
      position: 'absolute',
      width: '100%',
      opacity: 1,
      transform: 'translate3d(0%,0,0)',
      height: '100%',
    },
    leave: {
      position: 'absolute',
      width: '100%',
      opacity: 0,
      transform: 'translate3d(-50%,0,0)',
      height: '100%',
    },
  });

  return transitions.map(({
    item: location,
    props: style,
    key,
  }) => (
    <animated.div key={key} style={style}>
      <Switch location={location}>
        <Route path="/" exact={true}>
          <Redirect to="/larder"/>
        </Route>
        <Route path="/larder">
          <Larder/>
        </Route>
      </Switch>
    </animated.div>
  )) as any as JSX.Element;
};

export default Routes;
