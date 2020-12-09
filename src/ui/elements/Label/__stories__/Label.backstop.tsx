import React from 'react';
import Label from '../Label';

export default {
  title: 'elements/Label',
};

export const backstop = () => (
  <div>
    <Label>
      {'I am the label text'}
      <input placeholder="I am the input field"/>
    </Label>
  </div>
);
