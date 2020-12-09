import React from 'react';
import Summary from '../Summary';

export default {
  title: 'screens/larder/Update/Summary',
  component: Summary,
};

export const basic = () => (
  <Summary
    baseUnit="g"
    quantity={500}
  />
);
