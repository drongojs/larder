import React from 'react';
import { Stock } from 'domain/core';
import Item from './Item';
import { useTransition, config, a } from 'react-spring';

interface Props {
  stock: Stock[],
  onClick: (id: string) => void,
}

const AnimatedItem = a(Item);

const Items = ({
  stock,
  onClick,
}: Props) => {
  const transition = useTransition(stock, {
    key: stock => stock.id,
    config: config.gentle,
    from: {
      opacity: 0,
      transform: 'translate3d(-15%, 0px, 0px)',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0%, 0px, 0px)',
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(15%, 0px, 0px)',
    },
  });

  return transition((style, stock) => (
    <AnimatedItem
      style={style as any}
      {...stock}
      onClick={onClick}
    />
  ));
};

export default Items;
