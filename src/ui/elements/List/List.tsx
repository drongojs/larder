import { styled } from 'linaria/react';

export default styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: hidden;

  & > li:last-child {
    border-bottom-width: 0;
  }
`;
