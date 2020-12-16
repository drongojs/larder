import React from 'react';
import { Kind } from 'ui/theme';
import Button from './Button';
export { default } from './Button.stories';

export const backstop = () => (
  <div>
    <Button>
      basic
    </Button>
    <Button
      pending={true}
    >
      pending
    </Button>
    <Button
      kind={Kind.PRIMARY}
    >
      primary
    </Button>
    <Button
      kind={Kind.NONE}
    >
      none
    </Button>
  </div>
);
