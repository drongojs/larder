import React, { useState } from 'react';

const List = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);

  return (
    <div>
      <a href="/larder/id">
        <span>Tinned</span>
        <span>Peas</span>
        <span>250g</span>
        <button onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setMenuOpen(!menuOpen);
        }}>...</button>
        {menuOpen && (
          <div>
            <a href="/larder/id/edit">Edit</a>
            <div>Clear</div>
            <div>Add to shopping list</div>
            <div>Find recipes</div>
          </div>
        )}
      </a>
      <div>
        <span>Frozen</span>
        <span>Chips</span>
        <button>...</button>
        <span>1kg</span>
      </div>
    </div>
  );
};
List.displayName = 'List';

export default List;
