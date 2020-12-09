import { styled } from 'linaria/react';
import * as theme from 'ui/theme';

export default styled.li`
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  background-color: ${theme.palette.white.color};
  color: ${theme.palette.grey02.color};
  border-bottom: 2px solid ${theme.palette.grey01.color};

  &:first-child {
    padding-top: 0;
  }
`;
