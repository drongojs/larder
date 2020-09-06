import React from 'react';

const Form = () => {
  return (
    <div>
      <div>
        Peas - 500g
      </div>
      <div>
        <input type="text" placeholder="g"/>
      </div>
      <div>
        <a href="/larder">Ok</a>
        <a href="/larder">Cancel</a>
      </div>
    </div>
  );
};
Form.displayName = 'Form';

export default Form;
