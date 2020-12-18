import React from 'react';
import { Kind } from 'ui/theme';
import Button from '../Button';
import Notice from './Notice';

export { default } from './Notice.stories';

export const backstop = () => (
  <Notice kind={Kind.DANGER}>
    I am a notice box
  </Notice>
);

export const withButton = () => (
  <Notice kind={Kind.DANGER}>
    <span>I am a notice button</span>
    <Button kind={Kind.DANGER}>Retry</Button>
  </Notice>
);
