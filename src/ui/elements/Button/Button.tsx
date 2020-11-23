import React, { ComponentType } from 'react';
import { css } from 'linaria';
import Color from 'color';
import theme, { Kind } from 'ui/theme';
import { makeGetClassNames } from '@drongo/class-names';
import { withRipple } from 'ui/elements/Ripple';

const getStyles = makeGetClassNames({
  root: {
    default: css`
      position: relative;
      overflow: hidden;
      cursor: pointer;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      border: none;
      border-radius: ${theme.curvature}px;
      background-color: ${theme.palette.black.contrast};
      color: ${theme.palette.black.color};
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      display: inline-block;
      text-decoration: none;
      text-align: center;

      &:hover {
        background-color: ${Color(theme.palette.black.contrast).darken(0.05).toString()};
      }
      &:active {
        background-color: ${Color(theme.palette.black.contrast).darken(0.1).toString()};
      }
      &:focus {
        outline: none;
      }
    `,
    primary: css`
      background-color: ${theme.palette.primary.color};
      color: ${theme.palette.primary.contrast};

      &:hover {
        background-color: ${Color(theme.palette.primary.color).lighten(0.05).toString()};
      }
      &:active {
        background-color: ${Color(theme.palette.primary.color).darken(0.05).toString()};
        color: ${Color(theme.palette.primary.contrast).darken(0.05).toString()};
      }
    `,
    secondary: css`
      background-color: ${theme.palette.secondary.color};
      color: ${theme.palette.secondary.contrast};

      &:hover {
        background-color: ${Color(theme.palette.secondary.color).lighten(0.05).toString()};
      }
      &:active {
        background-color: ${Color(theme.palette.secondary.color).darken(0.05).toString()};
        color: ${Color(theme.palette.secondary.contrast).darken(0.05).toString()};
      }
    `,
    cta: css`
      background-color: ${theme.palette.cta.color};
      color: ${theme.palette.cta.contrast};

      &:hover {
        background-color: ${Color(theme.palette.cta.color).lighten(0.05).toString()};
      }
      &:active {
        background-color: ${Color(theme.palette.cta.color).darken(0.05).toString()};
        color: ${Color(theme.palette.cta.contrast).darken(0.05).toString()};
      }
    `,
    success: css`
      background-color: ${theme.palette.success.color};
      color: ${theme.palette.success.contrast};

      &:hover {
        background-color: ${Color(theme.palette.success.color).lighten(0.05).toString()};
      }
      &:active {
        background-color: ${Color(theme.palette.success.color).darken(0.05).toString()};
        color: ${Color(theme.palette.success.contrast).darken(0.05).toString()};
      }
    `,
    danger: css`
      background-color: ${theme.palette.danger.color};
      color: ${theme.palette.danger.contrast};

      &:hover {
        background-color: ${Color(theme.palette.danger.color).lighten(0.05).toString()};
      }
      &:active {
        background-color: ${Color(theme.palette.danger.color).darken(0.05).toString()};
        color: ${Color(theme.palette.danger.contrast).darken(0.05).toString()};
      }
    `,
    pending: css`
      animation: fade ${1500}ms infinite alternate ease-in-out;

      @keyframes fade {
        0% {
          opacity: 0.9;
        }
        100% {
          opacity: 0.5;
        }
      }
    `,
  },
});


interface Props extends React.ButtonHTMLAttributes<{}> {
  component?: ComponentType<any> | string,
  kind?: Kind,
  pending?: boolean,
  // TODO: make this intelligent
  [key: string]: any,
}

const Button = ({
  component: Component = 'button',
  kind = Kind.CTA,
  pending,
  children,
  onClick,
  ...props
}: Props) => {
  const styles = getStyles({
    primary: kind === Kind.PRIMARY,
    secondary: kind === Kind.SECONDARY,
    cta: kind === Kind.CTA,
    success: kind === Kind.SUCCESS,
    danger: kind === Kind.DANGER,
    pending,
  });

  return (
    <Component
      className={styles.root}
      onClick={(e: any) => {
        if (!pending) {
          onClick?.(e);
        }
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default withRipple(Button);
