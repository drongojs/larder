import {
  createElement,
  createContext,
  useContext as useReactContext,
  ReactNode,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { Context, Promises, ActionType } from './types';
import useReducer from './reducer';

export const context = createContext<Context<any>>(void 0);

export const useContext = <T>(): Context<T> => useReactContext(context);

export const Provider = ({
  cacheTime = 1000 * 60 * 3,
  children,
}: {
  cacheTime?: number,
  children: ReactNode,
}) => {
  const [ cache, dispatch ] = useReducer();
  const promises = useRef<Promises<any>['current']>({});
  const value = useMemo(() => ({
    cache,
    dispatch,
    promises,
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
            if (query.subscribers > 0) {
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
