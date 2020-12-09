import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { css, cx } from 'linaria';
import { palette, curvature } from 'ui/theme';
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
      border-color: ${palette.grey01.color};

      &:focus-within > * {
        border-color: ${palette.primary.color};
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
      border-color: ${palette.danger.color};
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
      border-radius: ${curvature * 2}px;
      border-color: inherit;
      background-color: ${palette.white.color};
      color: ${palette.white.contrast};
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

const TextInput = forwardRef(({
  hasError,
  suffix = null,
  prefix = null,
  ...props
}: Props, ref: any) => {
  const styles = getStyles({
    hasError,
    hasSuffix: suffix != null,
    hasPrefix: prefix != null,
  });

  return (
    <div className={styles.root}>
      {prefix}
      <input
        {...props}
        className={cx(styles.input, props.className)}
        ref={ref}
      />
      {suffix}
    </div>
  );
});

export default TextInput;
