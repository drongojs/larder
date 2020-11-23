import { styled } from 'linaria/react';

type Align = 'flex-start' | 'flex-end' | 'center' | 'initial';
type Justify = Align | 'space-around' | 'space-between';
type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';

interface FlexProps {
  direction?: Direction,
  grow?: boolean,
  justify?: Justify,
  align?: Align,
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = 'initial' }) => direction};
  flex-grow: ${({ grow }) => grow ? '1' : '0'};
  justify-content: ${({ justify = 'initial' }) => justify};
  align-items: ${({ align = 'initial' }) => align};
`;

interface ChildProp {
  align?: Align,
  justify?: Justify,
  grow?: boolean,
}

export const Child = styled.div<ChildProp>`
  align-self: ${({ align = 'initial' }) => align};
  justify-self: ${({ justify = 'initial' }) => justify};
  flex-grow: ${({ grow = true }) => grow ? '1' : '0'};
`;
