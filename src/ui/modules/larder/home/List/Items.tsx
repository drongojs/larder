import React from 'react';
import { Stock } from 'domain/core';
import Item from './Item';
import { useTransition, config, animated } from 'react-spring';

interface Props {
  stock: Stock[],
  onClick: (id: string) => void,
}

const AnimatedItem = animated(Item);

const Items = ({
  stock,
  onClick,
}: Props) => {
  const transitions = useTransition(stock, stock => stock.id, {
    config: config.gentle,
    from: {
      opacity: 0,
      transform: 'translate3d(-15%, 0px, 0px)',
    },
    enter: {
      opacity: 1,
      transform: 'transform3d(0%, 0px, 0px)',
    },
    leave: {
      opacity: 0,
      transform: 'transform3d(15%, 0px, 0px)',
    },

  });
  return transitions.map(({
    item: stock,
    key,
    props: style,
  }) => (
    <AnimatedItem
      style={style}
      key={key}
      {...stock}
      onClick={onClick}
    />
  )) as any as JSX.Element;
};

export default Items;
