import React, { ReactNode, useContext } from 'react';
import { Context } from './context';
import PureOption from './PureOption';

interface Props {
  render: (value: string) => ReactNode,
  onClick: (value: string) => any,
}

const AddOption = ({
  render,
  onClick,
}: Props) => {
  const {
    onKeyDown,
    search,
    setFocused,
  } = useContext(Context);

  if (!search) {
    return null;
  }

  const handleClick = async() => {
    await onClick(search);
    setFocused(false);
  };

  return (
    <PureOption
      selected={false}
      onClick={handleClick}
      onKeyDown={onKeyDown}
    >
      {render(search)}
    </PureOption>
  );
};

export default AddOption;
