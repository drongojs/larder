import React from 'react';
import { Globals } from 'react-spring';
import { Provider as Respite } from '../src/@drongo/respite';

if (SKIP_ANIMATIONS) {
  Globals.assign({
    skipAnimation: true,
  });
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'fullscreen',
}

export const decorators = [
  (Story) => (
    <Respite>
      <Story/>
    </Respite>
  ),
];
