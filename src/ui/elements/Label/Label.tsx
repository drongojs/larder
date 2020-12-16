import React, { ReactNode, LabelHTMLAttributes } from 'react';
import { css } from 'linaria';
import * as theme from 'ui/theme';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string,
  children: ReactNode,
}

const styles = {
  label: css`
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
    color: ${theme.palette.grey02.color};
  `,
};

const Label = ({ children }: Props) => {
  return (
    <label className={styles.label}>
      {children}
    </label>
  );
};

export default Label;
