import React from 'react';
import Page from 'presentation/modules/Page';
import Form from 'presentation/forms/larder/Edit';
import { enhance } from 'presentation/hocs';

const Edit = () => (
  <Page>
    <Form/>
  </Page>
);

export default enhance('EditScreen')(Edit);
