import {
  createElement,
  createContext,
  useContext as useReactContext,
  ReactNode,
  useMemo,
  useRef,
} from 'react';
import { Context, Promises, Subscribers } from './types';
import useReducer from './reducer';
import useCleanup from './useCleanup';

export const context = createContext<Context<any>>(void 0);

export const useContext = <T>(): Context<T> => {
  const result = useReactContext(context);
  if (!result) {
    throw new Error('You must wrap your app in @respite/query\'s <Provider>');
  }
  return result;
};

export const Provider = ({
  cacheTime = 1000 * 60 * 3,
  children,
}: {
  cacheTime?: number,
  children: ReactNode,
}) => {
  const [ cache, dispatch ] = useReducer();
  const promises = useRef<Promises<any>['current']>({});
  const subscribers = useRef<Subscribers['current']>({});
  const value = useMemo(() => ({
    cache,
    dispatch,
    promises,
    subscribers,
  }), [ cache, dispatch ]);

  useCleanup(dispatch, cacheTime, promises, subscribers);

  return createElement(
    context.Provider,
    { value },
    children,
  );
};
