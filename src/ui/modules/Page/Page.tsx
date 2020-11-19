import React, { ReactNode } from 'react';
import { css } from 'linaria';
import theme from 'ui/theme';
import Color from 'color';

interface Props {
  title: string,
  children: ReactNode,
}

const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: ${theme.palette.white.color};
    position: relative;
  `,
  title: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: ${theme.palette.primary.color};
    color: ${theme.palette.primary.contrast};
    font-size: 2rem;
    border-bottom: 2px solid ${Color(theme.palette.primary.color).darken(0.2).toString()};
  `,
  content: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1rem;
  `,
};

const Page = ({
  title,
  children,
}: Props) => (
  <div className={styles.root}>
    <div className={styles.title}>
      {title}
    </div>
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

export default Page;
