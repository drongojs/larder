import React, { ReactNode } from 'react';
import { css } from 'linaria';
import theme from 'ui/theme';
import { Flex } from 'ui/elements/Flex';
import Color from 'color';
import PaddingBox from 'ui/elements/PaddingBox';

interface Props {
  title: string,
  children: ReactNode,
}

const styles = {
  root: css`
    height: 100%;
    background-color: ${theme.palette.white.color};
    position: relative;
  `,
  title: css`
    margin-bottom: 0.5rem;
    background-color: ${theme.palette.primary.color};
    color: ${theme.palette.primary.contrast};
    font-size: 2rem;
    border-bottom: 2px solid ${Color(theme.palette.primary.color).darken(0.2).toString()};
  `,
};

const Page = ({
  title,
  children,
}: Props) => (
  <Flex direction="column" className={styles.root}>
    <Flex justify="center" align="center"  className={styles.title}>
      <PaddingBox all={0.5}>
        {title}
      </PaddingBox>
    </Flex>
    <Flex direction="column" grow={true} as={PaddingBox} all={1}>
      {children}
    </Flex>
  </Flex>
);

export default Page;
