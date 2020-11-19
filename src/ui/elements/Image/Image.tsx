import { styled } from 'linaria/react';
import theme from 'ui/theme';

interface Props {
  src: string,
  width?: number | string,
  height?: number | string,
}

export default styled.span<Props>`
  display: inline-block;
  width: ${(props) => {
    if (props.width == null) {
      return '100%';
    }
    if (typeof props.width === 'number') {
      return `${props.width}px`;
    }
    return props.width;
  }};
  height: ${(props) => {
    if (props.height == null) {
      return '0';
    }
    if (typeof props.height === 'number') {
      return `${props.height}px`;
    }
    return props.height;
  }};
  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url("${props.src}")`};
  border-radius: ${theme.curvature}px;

  padding-top: ${(props) => props.width == null && props.height == null ? '66.64%' : '0'};
`;
