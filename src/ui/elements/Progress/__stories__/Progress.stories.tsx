import React from 'react';
import Progress from '../Progress';
import Spinner from '../Spinner';

export default {
  title: 'elements/Progress',
  component: Progress,
};

export const basic = (props) => {
  return (
    <div>
      <Progress {...props}/>
    </div>
  );
};
basic.args = {
  value: 0,
  total: 10,
  speed: 500,
  size: 41,
};

export const spinner = (props) => {
  return (
    <Spinner {...props}/>
  );
};
spinner.args = {
  size: 100,
  speed: 500,
};
