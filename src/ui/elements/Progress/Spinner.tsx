import React, { useState } from 'react';
import Progress, { SimpleSize } from './Progress';
import { useToggle, useTimeoutEffect } from 'ui/utils';

declare const SKIP_ANIMATIONS: boolean;

interface Props {
  speed?: number,
  size?: number | SimpleSize,
}

const Spinner = ({
  size,
  speed = 500,
}: Props) => {
  if (SKIP_ANIMATIONS) {
    return (
      <Progress
        value={0.5}
        total={1}
        size={size}
      />
    );
  }
  const [ value, setValue ] = useState(0);
  const [ key, toggleKey ] = useToggle();

  useTimeoutEffect(speed, () => {
    if (value === 2) {
      toggleKey();
      setValue(0);
    } else {
      setValue(value + 1);
    }
  }, [ toggleKey, setValue, value ]);

  return (
    <Progress
      key={`${key}`}
      value={value}
      total={1}
      size={size}
      speed={speed}
    />
  );
};

export default Spinner;
