import React from 'react';
import { Progress, Spinner } from './';
export { default } from './Progress.stories';

export const backstop = () => (
  <div>
    <div>
      <Progress value={0}/>
    </div>
    <div>
      <Progress value={0.5}/>
    </div>
    <div>
      <Progress value={1}/>
    </div>
    <div>
      <Spinner size="large"/>
    </div>
  </div>
);
