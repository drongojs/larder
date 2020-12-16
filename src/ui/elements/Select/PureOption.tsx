import React, { ReactNode, KeyboardEvent } from 'react';
import { css, cx } from 'linaria';
import * as theme from 'ui/theme';

const styles = {
  root: css`
    outline: none;
    padding: 1rem;

    &:hover, &:focus {
      background-color: ${theme.palette.secondary.color};
    }
  `,
  selected: css`
    background-color: ${theme.palette.primary.color};
  `,
};

interface Props {
  selected: boolean,
  children: ReactNode,
  onClick: () => void,
  onKeyDown: (e: any) => void,
}

const PureOption = ({
  selected,
  children,
  onClick,
  onKeyDown,
}: Props) => {

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    onKeyDown(e);

    switch (e.key) {
    case 'ArrowDown':
      // @ts-ignore
      e.target.nextSibling?.focus();
      break;
    case 'ArrowUp':
      // @ts-ignore
      e.target.previousSibling?.focus();
      break;
    case 'Enter':
      // @ts-ignore
      e.target.click();
      break;
    }
  };
  const handleClick = () => onClick();

  return (
    <li
      role="option"
      aria-selected={selected}
      tabIndex={-1}
      className={cx(styles.root, selected && styles.selected)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </li>
  );
};

export default PureOption;
