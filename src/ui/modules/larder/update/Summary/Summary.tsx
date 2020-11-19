import React from 'react';
import { css } from 'linaria';
import { useSpring, animated } from 'react-spring';
import { formatQuantity } from 'domain/selectors';

const styles = {
  root: css`
    margin-top: 2rem;
    display: flex;
    align-items: center;
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
    <div className={styles.root}>
      <animated.span>
        {spring.quantity.interpolate((quantity) => formatQuantity(Math.round(quantity), baseUnit))}
      </animated.span>
    </div>
  );
};

export default Summary;
