import React from 'react';
import { ListItem } from 'ui/elements/List';
import { Stock } from 'domain/core';
import { formatQuantity } from 'domain/selectors';
import Image from 'ui/elements/Image';
import { css } from 'linaria';
import { useSpring, animated } from 'react-spring';
import { palette } from 'ui/theme';
import { Flex } from 'ui/elements/Flex';
import { toPrecision } from 'crosscutting/utils';

type ListItemProps = Parameters<typeof ListItem>[0];

interface Props extends Stock, Omit<ListItemProps, 'id' | 'onClick'> {
  onClick: (id: string) => void,
}

const styles = {
  title: css`
    font-size: 1.5rem;
  `,
  subtitle: css`
    color: ${palette.grey02.color};
    font-size: 1.5rem;
  `,
  content: css`
    padding-left: 2rem;
  `,
};

const Item = ({
  id,
  name,
  image,
  quantity,
  unit,
  categoryId,
  onClick,
  ...rest
}: Props) => {
  const spring = useSpring({ quantity });

  return (
    <ListItem
      className="stock-item"
      onClick={() => onClick(id)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          onClick(id);
        }
      }}
      {...rest}
    >
      <Image
        src={image}
        width={100}
        height={100}
      />
      <Flex
        grow={true}
        direction="column"
        justify="space-around"
        className={styles.content}
      >
        <span className={styles.title}>
          {name}
        </span>
        <animated.span className={styles.subtitle}>
          {spring.quantity.to(quantity => formatQuantity(toPrecision(quantity, 2), unit))}
        </animated.span>
      </Flex>
    </ListItem>
  );
};

export default Item;
