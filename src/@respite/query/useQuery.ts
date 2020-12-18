import {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  CallbackType,
  Deps,
  Query,
  Status,
  useCache,
} from '@respite/core';

// this looks like a lot of stuff but really all we're doing is syncing local state with the cache
export default function useQuery<T>(
  callback: CallbackType<T>,
  deps: Deps,
): Query<T> {
  const cache = useCache<T>();
  const [ , query ] = cache.getQuery(deps);

  const invalidate = useCallback(({ exact }: { exact?: boolean } = {}) => {
    cache.invalidate({
      exact,
      deps,
    });
  }, deps);

  const [ state, setState ] = useState(query);
  const {
    status,
    data,
    error,
  } = state;
  const cb = useCallback(callback, deps);

  const fetch = useCallback(() => {  
    // if there's already a promise then we're in the middle of fetching the data
    // potentially from an identical query from another component
    const existingPromise = cache.getPromise(deps);
    if (existingPromise) {
      return existingPromise;
    }

    const p = Promise.resolve().then(async(): Promise<any> => {
      cache.fetching({ deps });

      try {
        const data = await cb();
        cache.success({
          deps,
          data,
        });
      } catch (e) {
        cache.failure({
          deps,
          error: e,
        });
      }
    });
    cache.setPromise(deps, p);
    return p;
  }, [ cb ]);

  const read = useCallback(() => {
    // if the query needs fetching but the local query has data, we just want to silently fetch in the background
    if (query.status === Status.IDLE && status !== Status.IDLE) {
      fetch();
    }

    switch (status) {
    case Status.IDLE:
      throw fetch();
    case Status.LOADING:
      throw cache.getPromise(deps);
    case Status.FETCHING:
    case Status.SUCCESS:
      return data;
    case Status.ERROR:
      if (cache.getPromise(deps)) {
        throw cache.getPromise(deps);
      }
      throw error;
    }
  }, [ query.status, status, fetch, data, error ]);

  const write = useCallback((data: T) => {
    cache.success({
      deps,
      data,
    });
  }, deps);

  const prefetch = useCallback(() => {
    const promise = cache.getPromise(deps);
    // prefetch but only if the query is idle
    if (query.status === Status.IDLE && !promise) {
      fetch();
    }
  }, [ query.status, fetch ]);

  const reset = useCallback(() => {
    invalidate({ exact: true });
    setState({
      ...state,
      status: Status.IDLE,
    });
  }, [ invalidate, state ]);

  useEffect(() => {
    // this is where we determine when/what to update the local state with
    switch (query.status) {
    case Status.LOADING:
      switch (status) {
      // if the query is loading and we don't have some data already
      // mirror the query entirely
      case Status.IDLE:
        setState(query);
        break;
      // we're already re-fetching so we don't need to do anything
      case Status.FETCHING:
        break;
      case Status.ERROR:
        setState(query);
        break;
      // for anything else, we're in a non-fetching state and we need to transition to a fetching state
      default:
        setState({
          ...state,
          status: Status.FETCHING,
        });
        break;
      }
      break;
    // completely replace the state
    case Status.SUCCESS:
    case Status.ERROR:
      setState(query);
      break;
    }
  }, [ query.status, query.data, query.error ]);

  useEffect(() => {
    cache.subscribe(deps);
    return () => {
      cache.unsubscribe(deps);
    };
  }, deps);

  return useMemo(() => {
    const r: Query<T> = {
      status,
      invalidate,
      prefetch,
      reset,
      data: null,
    };
    Object.defineProperty(r, 'data', {
      get: read,
      set: write,
    });

    return r;
  }, [ query.status, status, invalidate, read, write ]);
}
