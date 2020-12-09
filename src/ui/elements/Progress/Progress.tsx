import React from 'react';
import * as theme from 'ui/theme';

export type SimpleSize = 'small' | 'medium' | 'large';

interface Props {
  value: number,
  total?: number,
  speed?: number,
  size?: number | SimpleSize,
}

const getWidthFromSize = (size: number | SimpleSize) => {
  if (typeof size === 'number') {
    return size;
  }
  switch (size) {
  case 'small':
    return 40;
  case 'large':
    return 80;
  default:
    return 60;
  }
};

const Progress = ({
  value,
  total = 1,
  speed = 500,
  size = 'medium',
}: Props) => {
  const width = getWidthFromSize(size);
  const stroke = width / 8;
  const r = (width / 2) - stroke;
  const cm = 2 * Math.PI * r;
  const arr = cm * (1 - (value / total));
  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      style={{
        transform: 'rotate(-90deg)',
      }}
    >
      <circle
        cx={width / 2}
        cy={width / 2}
        r={r}
        fill="none"
        stroke={theme.palette.grey01.color}
        strokeWidth={stroke}
      />
      <circle
        cx={width / 2}
        cy={width / 2}
        r={r}
        fill="none"
        stroke={theme.palette.secondary.color}
        strokeWidth={stroke}
        strokeDasharray={cm}
        strokeDashoffset={arr}
        style={{
          transition: `stroke-dashoffset ${speed}ms ease-out`,
        }}
      />
    </svg>
  );
};
Progress.displayName = 'Progress';

export default Progress;
