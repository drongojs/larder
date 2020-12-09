import React from 'react';
import Image from '../Image';
export { default } from './Image.stories';

export const backstop = () => (
  <div>
    <div>
      <Image
        src="http://lorempixel.com/100/100/food/1"
        width={100}
        height={100}
      />
    </div>
    <div>
      <Image
        src="http://lorempixel.com/100/100/food/1"
      />
    </div>
  </div>
);
