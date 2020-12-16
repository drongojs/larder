import React, { useState } from 'react';
import Search from './Search';

export default {
  title: 'screens/larder/Home/Search',
};

export const basic = () => {
  const [ value, setValue ] = useState('');
  return (
    <div>
      <Search
        submitting={false}
        value={value}
        onChange={setValue}
        onSubmit={e => e.preventDefault}
      />
    </div>
  );
};

export const submitting = () => {
  const [ value, setValue ] = useState('');
  return (
    <div>
      <Search
        submitting={true}
        value={value}
        onChange={setValue}
        onSubmit={e => e.preventDefault}
      />
    </div>
  );
};
