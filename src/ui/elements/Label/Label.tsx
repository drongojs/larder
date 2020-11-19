import React, { ReactNode } from 'react';
import { css } from 'linaria';
import theme from 'ui/theme';

interface Props { children: ReactNode }

const styles = {
  label: css`
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
    color: ${theme.palette.grey02.color};
  `,
};

const Label = ({ children }: Props) => {
  const [ labelText, field ] = React.Children.toArray(children);

  return (
    <label>
      <div className={styles.label}>
        {labelText}
      </div>
      {field}
    </label>
  );
};

export default Label;
