import React from 'react';
import Page from '../Page';

export default {
  title: 'modules/Page',
};

export const Basic = () => (
  <div style={{ height: 700, backgroundColor: '#ccc' }}>
    <Page title="Page title">
      <div>hello world</div>
    </Page>
  </div>
);
