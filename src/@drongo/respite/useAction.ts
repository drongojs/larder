import {
  UseAction,
  ActionType,
  Deps,
  Query,
} from './types';
import { useContext } from './context';
import { useRef, useState, useEffect, useCallback } from 'react';
import { tuple } from 'crosscutting/utils';

const useAction: UseAction = <T, F extends (...args: any[]) => Promise<T>>(
  callback: F,
  deps: any[],
  ...queries: Array<Query<any> | Deps | string>
) => {
  const { dispatch } = useContext();
  const mountedRef = useRef(true);
  const [ pending, setPending ] = useState(false);
  const [ error, setError ] = useState(void 0);

  useEffect(() => () => {
    mountedRef.current = false;
  }, []);

  const action = useCallback(async(...args: Parameters<F>) => {
    let result: T;
    let error: any;
    if (mountedRef.current) {
      setPending(true);
      setError(void 0);
    }
    try {
      result = await callback(...args);
    } catch (e) {
      if (mountedRef.current) {
        setError(e);
      }
      error = e;
    }
    if (mountedRef.current) {
      setPending(false);
    }

    if (error) {
      throw error;
    }
    
    if (mountedRef.current) {
      queries.forEach(query => {
        if (typeof query === 'string') {
          dispatch({
            type: ActionType.INVALIDATE,
            deps: [ query ],
            exact: false,
          });
        } else if (Array.isArray(query)) {
          dispatch({
            type: ActionType.INVALIDATE,
            deps: query,
            exact: true,
          });
        } else {
          query?.invalidate?.({ exact: true });
        }
      });
    }

    return result;
  }, [ setPending, setError, dispatch, ...queries, ...deps ]) as F;

  return tuple([ action, pending, error ]);
};

export default useAction;
