import React from 'react';
import {
  CircularProgress,
} from '@material-ui/core';
import { enhance } from 'presentation/hocs';
import Page from '../Page';

const PageLoading = () => (
  <Page>
    <div
      style={{
        display: 'flex',
        height: '50vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress/>
    </div>
  </Page>
);

export default enhance('Page')(PageLoading);
