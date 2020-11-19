import React, { LiHTMLAttributes } from 'react';
import { css } from 'linaria';
import theme from 'ui/theme';
import Color from 'color';
import { withRipple } from 'ui/elements/Ripple';

const styles = {
  root: css`
    position: relative;
    overflow: hidden;
    display: flex;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: ${theme.palette.white.color};
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: ${Color(theme.palette.white.color).darken(0.04).toString()};
    }
    &:focus {
      background-color: ${Color(theme.palette.white.color).darken(0.03).toString()};
    }
  `,
};

const ListItem = (props: LiHTMLAttributes<HTMLLIElement>) => {
  return (
    <li
      tabIndex={0}
      {...props}
      className={[ styles.root, props.className ].join(' ')}
    >
      {props.children}
    </li>
  );
};

export default withRipple(ListItem);
