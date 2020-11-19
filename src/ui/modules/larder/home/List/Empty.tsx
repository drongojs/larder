import React from 'react';
import { ListItem } from 'ui/elements/List';
import { css } from 'linaria';

const styles = {
  root: css`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    font-size: 1.5rem;
  `,
};

const Empty = () => (
  <ListItem>
    <div className={styles.root}>
      Nothing found
    </div>
  </ListItem>
);
export default Empty;
