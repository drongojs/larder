import React, { useContext, ReactNode } from 'react';
import { Context } from './context';
import PureOption from './PureOption';

interface Props {
  value: any,
  search?: string,
  children: ReactNode,
}

const Option = ({
  value,
  search = value,
  children,
}: Props) => {
  const {
    onClick,
    onKeyDown,
    search: currentSearch,
    value: currentValue,
  } = useContext(Context);

  if (currentSearch && currentSearch !== search && !search.includes(currentSearch)) {
    return null;
  }

  const selected = value === currentValue;

  const handleClick = () => onClick(value);

  return (
    <PureOption
      selected={selected}
      onClick={handleClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </PureOption>
  );
};

export default Option;
