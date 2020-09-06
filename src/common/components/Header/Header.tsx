import React, { useState, ReactNode } from 'react';

interface Props {
  options: ReactNode[],
}

const Header = ({ options }: Props) => {
  const [ open, setOpen ] = useState(false);

  return (
    <header>
      <a href="/">Larder</a>
      <button onClick={() => setOpen(!open)}>...</button>
      {open && (
        <div>
          {options}
        </div>
      )}
    </header>
  );
};
Header.displayName = 'Header';

export default Header;
