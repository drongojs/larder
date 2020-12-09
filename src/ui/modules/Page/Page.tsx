import React, { ReactNode } from 'react';
import { css } from 'linaria';
import { queries, palette } from 'ui/theme';
import { Flex } from 'ui/elements/Flex';
import Color from 'color';

interface Props {
  title: string,
  children: ReactNode,
}

const styles = {
  root: css`
    min-height: 100%;
    background-color: ${palette.white.color};
    position: relative;
  `,
  title: css`
    margin-bottom: 0.5rem;
    background-color: ${palette.primary.color};
    color: ${palette.primary.contrast};
    font-size: 2rem;
    border-bottom: 2px solid ${Color(palette.primary.color).darken(0.2).toString()};
    padding: 0.5rem;

    ${queries.tabletUp} {
      padding: 1rem;
      margin-bottom: 1rem;
    }
  `,
  content: css`
    position: relative;
    padding: 1rem;
    ${queries.tabletUp} {
      width: 75%;
      margin: auto;
    }
    ${queries.desktopOnly} {
      /* width: 50%; */
    }
  `,
};

const Page = ({
  title,
  children,
}: Props) => (
  <Flex direction="column" className={styles.root}>
    <Flex justify="center" align="center"  className={styles.title}>
      {title}
    </Flex>
    <Flex direction="column" grow={true} className={styles.content}>
      {children}
    </Flex>
  </Flex>
);

export default Page;
