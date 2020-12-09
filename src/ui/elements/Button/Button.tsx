import React, { ComponentType } from 'react';
import { css } from 'linaria';
import Color from 'color';
import { curvature, palette, Kind } from 'ui/theme';
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
      border-radius: ${curvature}px;
      background-color: ${palette.black.contrast};
      color: ${palette.black.color};
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      display: inline-block;
      text-decoration: none;
      text-align: center;

      &:hover {
        background-color: ${Color(palette.black.contrast).darken(0.05).toString()};
      }
      &:active {
        background-color: ${Color(palette.black.contrast).darken(0.1).toString()};
      }
      &:focus {
        outline: none;
      }
    `,
    primary: css`
      background-color: ${palette.primary.color};
      color: ${palette.primary.contrast};

      &:hover {
        background-color: ${Color(palette.primary.color).lighten(0.05).toString()};
      }
      &:active {
        background-color: ${Color(palette.primary.color).darken(0.05).toString()};
        color: ${Color(palette.primary.contrast).darken(0.05).toString()};
      }
    `,
    secondary: css`
      background-color: ${palette.secondary.color};
      color: ${palette.secondary.contrast};

      &:hover {
        background-color: ${Color(palette.secondary.color).lighten(0.05).toString()};
      }
      &:active {
        background-color: ${Color(palette.secondary.color).darken(0.05).toString()};
        color: ${Color(palette.secondary.contrast).darken(0.05).toString()};
      }
    `,
    cta: css`
      background-color: ${palette.cta.color};
      color: ${palette.cta.contrast};

      &:hover {
        background-color: ${Color(palette.cta.color).lighten(0.05).toString()};
      }
      &:active {
        background-color: ${Color(palette.cta.color).darken(0.05).toString()};
        color: ${Color(palette.cta.contrast).darken(0.05).toString()};
      }
    `,
    success: css`
      background-color: ${palette.success.color};
      color: ${palette.success.contrast};

      &:hover {
        background-color: ${Color(palette.success.color).lighten(0.05).toString()};
      }
      &:active {
        background-color: ${Color(palette.success.color).darken(0.05).toString()};
        color: ${Color(palette.success.contrast).darken(0.05).toString()};
      }
    `,
    danger: css`
      background-color: ${palette.danger.color};
      color: ${palette.danger.contrast};

      &:hover {
        background-color: ${Color(palette.danger.color).lighten(0.05).toString()};
      }
      &:active {
        background-color: ${Color(palette.danger.color).darken(0.05).toString()};
        color: ${Color(palette.danger.contrast).darken(0.05).toString()};
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
