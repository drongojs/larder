import {
  createElement,
  createContext,
  useContext as useReactContext,
  ReactNode,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { Context, Promises, ActionType, Subscribers } from './types';
import useReducer from './reducer';

export const context = createContext<Context<any>>(void 0);

export const useContext = <T>(): Context<T> => {
  const result = useReactContext(context);
  if (!result) {
    throw new Error('You must wrap your app in @drongo/respite\'s <Provider>');
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

  useEffect(() => {
    if (cacheTime < Infinity) {
      const handle = setInterval(() => {
        dispatch({
          type: ActionType.INVALIDATE,
          deps: [ '' ],
          predicate: (query, key) => {
            if (promises.current[key]) {
              return false;
            }
            if (subscribers.current[key] > 0) {
              return false;
            }
            return true;
          },
        });
        Object.keys(promises.current).forEach(key => {
          if (!promises.current[key]) {
            delete promises.current[key];
          }
        });
        Object.keys(subscribers.current).forEach(key => {
          if (!subscribers.current[key]) {
            delete subscribers.current[key];
          }
        })
      }, cacheTime);
      return () => clearInterval(handle);
    }
  }, []);

  return createElement(
    context.Provider,
    { value },
    children,
  );
};
