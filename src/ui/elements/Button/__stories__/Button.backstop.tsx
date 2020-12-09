import React from 'react';
import { Kind } from 'ui/theme';
import Button from '../Button';
export { default } from './Button.stories';

export const backstop = () => (
  <div>
    <div>
      <Button>
        basic
      </Button>
    </div>
    <div>
      <Button
        pending={true}
      >
        pending
      </Button>
    </div>
    <div>
      <Button
        kind={Kind.PRIMARY}
      >
        primary
      </Button>
    </div>
    <div>
      <Button
        kind={Kind.NONE}
      >
        none
      </Button>
    </div>
  </div>
);
