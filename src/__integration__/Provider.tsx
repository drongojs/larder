import React, { ReactNode } from 'react';
import { MemoryRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { Jpex } from 'jpex';
import { Provider as JpexProvider } from 'react-jpex';

interface Props {
  url: string,
  inject?: (jpex: Jpex) => void,
  route?: string,
  children?: ReactNode,
}

const CurrentPath = () => {
  const {
    hash,
    pathname,
    search,
  } = useLocation();

  return (
    <div id="int-current-path">
      {`${pathname}${hash}${search}`}
    </div>
  );
};

const Provider = ({
  url,
  inject,
  route = url,
  children,
}: Props) => {
  return (
    <JpexProvider onMount={inject}>
      <Router initialEntries={[ url ]}>
        <Switch>
  `        <Route path={route} exact={true}>
            {children}
          </Route>`
          <Route path="/" exact={false}>
            <CurrentPath/>
          </Route>
        </Switch>
      </Router>
    </JpexProvider>
  );
};

export default Provider;
