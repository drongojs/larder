import { createContext } from 'react';

interface State {
  value: any,
  search: string,
  onClick: (value: any) => void,
  onKeyDown: (e: any) => void,
  setFocused: (v: boolean) => void,
}

export const Context = createContext<State>(null);

export const Provider = Context.Provider;
