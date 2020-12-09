import React, { LiHTMLAttributes } from 'react';
import { css, cx } from 'linaria';
import { queries, palette } from 'ui/theme';
import Color from 'color';
import { withRipple } from 'ui/elements/Ripple';

const styles = {
  root: css`
    position: relative;
    overflow: hidden;
    display: flex;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: ${palette.white.color};
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: ${Color(palette.white.color).darken(0.04).toString()};
    }
    &:focus {
      background-color: ${Color(palette.white.color).darken(0.03).toString()};
    }

    ${queries.tabletUp} {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  `,
};

const ListItem = (props: LiHTMLAttributes<HTMLLIElement>) => {
  return (
    <li
      tabIndex={0}
      {...props}
      className={cx(styles.root, props.className)}
    >
      {props.children}
    </li>
  );
};

export default withRipple(ListItem);
