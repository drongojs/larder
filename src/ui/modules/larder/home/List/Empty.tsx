import React from 'react';
import { css } from 'linaria';
import { ListItem } from 'ui/elements/List';
import { Flex } from 'ui/elements/Flex';

const styles = {
  root: css`
    height: 100px;
    font-size: 1.5rem;
  `,
};

const Empty = () => (
  <ListItem>
    <Flex align="center" justify="center" grow={true} className={styles.root}>
      Nothing found
    </Flex>
  </ListItem>
);
export default Empty;
