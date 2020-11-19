import React, { useState } from 'react';
import Search from '../Search';

export default {
  title: 'modules/larder/home/Search',
};

export const basic = (props) => {
  const [ value, setValue ] = useState('');
  return (
    <div>
      <Search
        value={value}
        onChange={setValue}
        onSubmit={(e) => e.preventDefault}
        {...props}
      />
    </div>
  );
};
basic.args = {
  submitting: false,
};
