import { css, cx } from 'linaria';
import React, { ReactNode } from 'react';
import { Kind, palette, curvature } from 'ui/theme';

interface Props {
  className?: string,
  kind?: Kind,
  children: ReactNode,
}

const styles = {
  root: css`
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    min-height: 3rem;
    border-radius: ${curvature * 0.75}px;
    align-items: center;
    justify-content: space-between;
  `,
  danger: css`
    background-color: ${palette.danger.color};
    color: ${palette.danger.contrast};
  `,
};

export default function Notice({ kind, className, children }: Props) {
  return (
    <div
      className={cx(
        styles.root,
        styles[kind],
        className,
      )}
    >
      {children}
    </div>
  );
}
