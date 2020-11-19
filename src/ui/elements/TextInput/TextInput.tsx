import React, { InputHTMLAttributes, ReactNode } from 'react';
import { css } from 'linaria';
import theme from 'ui/theme';
import { makeGetClassNames } from '@drongo/class-names';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  hasError?: boolean,
  suffix?: ReactNode,
  prefix?: ReactNode,
}

const getStyles = makeGetClassNames({
  root: {
    default: css`
      display: flex;
      width: 100%;
      border-color: ${theme.palette.grey01.color};

      &:focus-within > * {
        border-color: ${theme.palette.primary.color};
      }

      & button:last-child {
        padding-top: 0;
        padding-bottom: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      & button:first-child {
        padding-top: 0;
        padding-bottom: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `,
    hasError: css`
      border-color: ${theme.palette.danger.color};
    `,
  },
  input: {
    default: css`
      flex-grow: 1;
      outline: none;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      border-style: solid;
      border-width: 2px;
      border-radius: ${theme.curvature * 2}px;
      border-color: inherit;
      background-color: ${theme.palette.white.color};
      color: ${theme.palette.white.contrast};
    `,
    hasSuffix: css`
      border-right-width: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `,
    hasPrefix: css`
      border-left-width: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `,
  },
});

const TextInput = ({
  hasError,
  suffix = null,
  prefix = null,
  ...props
}: Props) => {
  const styles = getStyles({
    hasError,
    hasSuffix: suffix != null,
    hasPrefix: prefix != null,
  });

  return (
    <div className={styles.root}>
      {prefix}
      <input
        className={styles.input}
        {...props}
      />
      {suffix}
    </div>
  );
};

export default TextInput;
