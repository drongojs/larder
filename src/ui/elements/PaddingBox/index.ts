import { styled } from 'linaria/react';

interface Props {
  top?: number,
  right?: number,
  bottom?: number,
  left?: number,
  x?: number,
  y?: number,
  all?: number,
}

export default styled.div<Props>`
  padding: ${props => {
    let {
      top = 0,
      right = 0,
      bottom = 0,
      left = 0,
    } = props;

    if (props.all != null) {
      top = right = bottom = left = props.all;
    }
    if (props.x != null) {
      left = right = props.x;
    }
    if (props.y != null) {
      top = bottom = props.y;
    }

    return `${top}rem ${right}rem ${bottom}rem ${left}rem`;
  }};
`;
