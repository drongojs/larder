import React from 'react';
import Page from 'presentation/modules/Page';
import Form from 'presentation/forms/larder/Update';

interface Props {
  onClose: () => any,
}

const Update = (props: Props) => (
  <Page>
    <Form {...props}/>
  </Page>
);
Update.displayName = 'Update';

export default Update;
