import { styled } from 'linaria/react';
import { palette, curvature } from 'ui/theme';


export const Suffix = styled.span<{ padding?: boolean }>`
  border-width: 2px;
  border-left-width: 0px;
  border-radius: ${curvature * 2}px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-style: solid;
  border-color: inherit;
  background-color: ${palette.white.color};
`;

export const Prefix = styled.span<{ padding?: boolean }>`
  border-width: 2px;
  border-right-width: 0px;
  border-radius: ${curvature * 2}px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-style: solid;
  border-color: inherit;
  background-color: ${palette.white.color};
`;
