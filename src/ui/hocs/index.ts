import { ComponentType, createElement } from 'react';

export const wrap = <T extends {}, R, S extends R>(
  Component: ComponentType<R>,
  fn: (props: T) => S,
) => {
  const Wrapper = (props: T) => createElement(Component, fn(props));
  return Wrapper;
};
