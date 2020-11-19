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

export default {
  palette,
  curvature,
  font,
};
