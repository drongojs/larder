import React from 'react';
import Page from 'presentation/modules/Page';
import Form from 'presentation/modules/larder/edit/Form';
import { enhance } from 'presentation/hocs';

const Edit = () => (
  <Page>
    <Form/>
  </Page>
);

export default enhance('EditScreen')(Edit);
