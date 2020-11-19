import React from 'react';
import Button from '../Button';
import { Kind } from 'ui/theme';

export default {
  title: 'elements/Button',
  component: Button,
  argTypes: {
    kind: {
      control: {
        type: 'select',
        options: [
          Kind.NONE,
          Kind.PRIMARY,
          Kind.SECONDARY,
          Kind.CTA,
          Kind.SUCCESS,
          Kind.DANGER,
        ],
      },
    },
  },
};

export const basic = ({ text, ...props }) => {
  return (
    <Button {...props}>
      {text}
    </Button>
  );
};
basic.args = {
  text: 'Click me',
  pending: false,
  kind: Kind.CTA,
};
