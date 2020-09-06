import React from 'react';

const Form = () => {
  return (
    <div>
      <div>
        Name <input value="peas"/>
      </div>
      <div>
        Amount
        <input value="500"/>
        <select>
          <option>g</option>
        </select>
      </div>
      <div>
        Category <input value="frozen"/>
      </div>
      <div>
        <button>Save</button>
        <button>Cancel</button>
        <button>Delete</button>
      </div>
    </div>
  );
};
Form.displayName = 'Form';

export default Form;
