import React from 'react';
import { css } from 'linaria';
import { Spinner } from 'ui/elements/Progress';

const styles = {
  root: css`
    text-align: center;
  `,
};

const ListLoading = () => (
  <div className={styles.root}>
    <Spinner/>
    <div>Loading...</div>
  </div>
);

export default ListLoading;
