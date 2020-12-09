export enum Kind {
  NONE = '',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  CTA = 'cta',
  SUCCESS = 'success',
  DANGER = 'danger',
}

const BLACK = '#0E0E2C';
const WHITE = '#FFF';

export const palette = {
  primary: {
    color: '#1D9FC1',
    contrast: WHITE,
  },
  secondary: {
    color: '#66C3DB',
    contrast: WHITE,
  },
  cta: {
    color: '#EF7B45',
    contrast: WHITE,
  },
  grey01: {
    color: '#EDEAE1',
    contrast: BLACK,
  },
  grey02: {
    color: '#969696',
    contrast: BLACK,
  },
  success: {
    color: '#97D8B2',
    contrast: BLACK,
  },
  danger: {
    color: '#F05D5E',
    contrast: WHITE,
  },
  black: {
    color: BLACK,
    contrast: WHITE,
  },
  white: {
    color: WHITE,
    contrast: BLACK,
  },
};

export const curvature = 7;

export const font = {
  family: 'Open Sans',
  size: 14,
};

export const breakpoints = {
  phone: {
    max: 599,
  },
  tablet: {
    min: 900,
    max: 1199,
  },
  desktop: {
    min: 1200,
  },
};

export const queries = {
  phoneOnly: `@media(max-width: ${breakpoints.phone.max}px)`,
  tabletDown: `@media(max-width: ${breakpoints.tablet.max}px)`,
  tabletOnly: `@media(min-width: ${breakpoints.tablet.min}px) and (max-width: ${breakpoints.tablet.max}px)`,
  tabletUp: `@media(min-width: ${breakpoints.tablet.min}px)`,
  desktopOnly: `@media(min-width: ${breakpoints.desktop.min}px)`,
};
