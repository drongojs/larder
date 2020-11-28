import { Deps, ActionType, Cache } from './types';
import { useContext } from './context';
import { getQuery, serialize } from './utils';
import { useMemo, useCallback } from 'react';

const useCache = <T>(deps: Deps) => {
  const { cache, dispatch, promises } = useContext<T>();
  const [ , query ] = getQuery<T>(cache, deps);
  const keys = serialize(deps);

  const invalidate = useCallback(({ exact }: { exact?: boolean } = {}) => {
    dispatch({
      type: ActionType.INVALIDATE,
      deps,
      exact: Boolean(exact),
    });
  }, deps);

  const setFetching = useCallback(() => {
    dispatch({
      type: ActionType.FETCHING,
      deps,
    });
  }, deps);

  const setData = useCallback((data: T) => {
    dispatch({
      type: ActionType.SUCCESS,
      deps,
      data,
    });
  }, deps);
  const setError = useCallback((error: any) => {
    dispatch({
      type: ActionType.FAILURE,
      deps,
      error,
    });
  }, deps);

  const subscribe = useCallback(() => {
    dispatch({
      type: ActionType.SUBSCRIBE,
      deps,
    });
    return () => {
      dispatch({
        type: ActionType.UNSUBSCRIBE,
        deps,
      });
    };
  }, deps);

  const getPromise = () => {
    return promises.current[keys];
  };
  const setPromise = (p: Promise<T>) => {
    promises.current[keys] = p;
  };

  return useMemo(() => {
    const r: Cache<T> = {
      invalidate,
      setFetching,
      setData,
      setError,
      query,
      subscribe,
      promise: null,
    };
    Object.defineProperty(r, 'promise', {
      get: getPromise,
      set: setPromise,
    });
    return r;
  }, [ invalidate, setFetching, setData, setError, query, subscribe, keys ]);
};

export default useCache;
