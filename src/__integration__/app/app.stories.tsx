import React from 'react';
import Routes from 'ui/routes/Routes';
import {
  MemoryRouter as Router,
  useLocation,
} from 'react-router-dom';
import { Jpex } from 'jpex';
import { Provider as JpexProvider } from 'react-jpex';
import stockDi from '../stock/state';
import categoriesDi from '../categories/state';

export default {
  title: 'app',
};

const inject = (jpex: Jpex) => {
  stockDi(jpex);
  categoriesDi(jpex);
};

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

export const routes = () => {
  const params = new URLSearchParams(window.location.search);
  const url = params.get('url');

  return (
    <JpexProvider onMount={inject}>
      <Router initialEntries={[ url ]}>
        <Routes/>
        <CurrentPath/>
      </Router>
    </JpexProvider>
  );
};
