import React from 'react';
import { css } from 'linaria';
import { useSpring, animated } from 'react-spring';
import { formatQuantity } from 'domain/selectors';
import { Flex } from 'ui/elements/Flex';
import { toPrecision } from 'crosscutting/utils';

const styles = {
  root: css`
    margin-top: 2rem;
    font-size: 2rem;
  `,
};

interface Props {
  baseUnit: string,
  quantity: number,
}

const Summary = ({
  baseUnit,
  quantity,
}: Props) => {
  const spring = useSpring({ quantity });

  return (
    <Flex align="center" justify="center" className={styles.root}>
      <animated.span>
        {spring.quantity.to(quantity => formatQuantity(toPrecision(quantity, 2), baseUnit))}
      </animated.span>
    </Flex>
  );
};

export default Summary;
