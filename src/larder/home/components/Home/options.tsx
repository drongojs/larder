import React from 'react';


export default () => {
  const groupedOption = (
    <div key="grouped">
      Group by Category <input
        type="checkbox"
        checked={window.location.search.includes('grouped=true')}
        onClick={() => {
          const grouped = window.location.search.includes('grouped=true');
          window.location.href = `/larder?grouped=${!grouped}`;
        }}
      />
    </div>
  );
  
  const filterOption = (
    <div key="filter">
      Filter
      <select>
        <option>Everything</option>
        <option>Only things you have in</option>
        <option>{'Only things you\'ve run out of'}</option>
      </select>
    </div>
  );
  
  return [
    groupedOption,
    filterOption,
  ];
};
