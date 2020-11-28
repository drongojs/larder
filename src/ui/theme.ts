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

const palette = {
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

const curvature = 7;

const font = {
  family: 'Open Sans',
  size: 14,
};

const breakpoints = {
  phone: {
    max: 599,
  },
  tablet: {
    min: 600,
    max: 899,
  },
  tabletLandscape: {
    min: 900,
    max: 1199,
  },
  desktop: {
    min: 1200,
  },
};

export const tabletUp = () => `@media (min-width: ${breakpoints.tablet.min}px)`;

export const tabletLandscapeUp = () => `@media (min-width: ${breakpoints.tabletLandscape.min}px)`;

export const desktopUp = () => `@media (min-width: ${breakpoints.desktop.min}px)`;

export default {
  breakpoints,
  palette,
  curvature,
  font,
};
