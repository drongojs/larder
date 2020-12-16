import React from 'react';
import Image from './Image';
export { default } from './Image.stories';

export const backstop = () => (
  <div>
    <div>
      <Image
        src="https://picsum.photos/id/488/300/300"
        width={100}
        height={100}
      />
    </div>
    <div>
      <Image
        src="https://picsum.photos/id/488/300/300"
      />
    </div>
  </div>
);
