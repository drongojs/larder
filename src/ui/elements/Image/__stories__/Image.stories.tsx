import React from 'react';
import Image from '../Image';

export default {
  title: 'elements/Image',
  component: Image,
};


export const basic = ({
  srcWidth,
  srcHeight,
  ...props
}) => {
  const src = `http://lorempixel.com/${srcWidth}/${srcHeight}/food/`;

  return (
    <Image
      src={src}
      {...props}
    />
  );
};
basic.args = {
  width: 100,
  height: 100,
  srcWidth: 100,
  srcHeight: 100,
};

export const landscape = () => (
  <div style={{ width: '600px', margin: 'auto' }}>
    <Image
      src="http://lorempixel.com/640/480/food/"
    />
  </div>
);
