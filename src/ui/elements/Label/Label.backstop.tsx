import React from 'react';
import Label from './Label';

export default {
  title: 'elements/Label',
};

export const backstop = () => (
  <div>
    <Label htmlFor="input">
      {'I am the label text'}
    </Label>
    <input id="input" placeholder="I am the input field"/>
  </div>
);
