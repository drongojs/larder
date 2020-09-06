import React from 'react';
import Header from 'common/components/Header';
import Search from '../Search';
import List from '../List';
import renderOptions from './options';

const Home = () => (
  <>
    <Header
      options={renderOptions()}
    />
    <Search/>
    <List/>
  </>
);
Home.displayName = 'Home';

export default Home;
