import React from 'react';
import { enhance } from 'presentation/hocs';

// TODO: make this component attractive
// TODO: have some real error handling
const PageError = () => (
  <div>Something went wrong</div>
);

export default enhance('PageError')(PageError);
