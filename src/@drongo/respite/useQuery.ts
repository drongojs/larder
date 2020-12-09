import { useState, useCallback, useEffect, useMemo } from 'react';
import { UseQuery, CallbackType, Deps, Status, Query } from './types';
import useCache from './useCache';

const useQuery: UseQuery = <T>(
  callback: CallbackType<T>,
  deps: Deps,
) => {
  const cache = useCache<T>(deps);
  const {
    invalidate,
    query,
  } = cache;
  const [ {
    status,
    data,
    error,
  }, setState ] = useState(query);
  const cb = useCallback(callback, deps);

  const fetch = useCallback(() => {    
    if (cache.promise) {
      return cache.promise;
    }

    const p = cache.promise = Promise.resolve().then(async(): Promise<any> => {
      cache.setFetching();

      try {
        // TODO: could we make the callback optional
        const res = await cb();
        cache.setData(res);
        cache.promise = null;
      } catch (e) {
        cache.setError(e);
        cache.promise = null;
      }
    });
    return p;
  }, [ cache.setFetching, cache.setData, cache.setError, cb ]);

  const read = useCallback(() => {
    if (query.status === Status.IDLE && status !== Status.IDLE) {
      fetch();
    }

    switch (status) {
    case Status.IDLE:
      throw fetch();
    case Status.LOADING:
      throw cache.promise;
    case Status.SUCCESS:
      return data;
    case Status.ERROR:
      if (cache.promise) {
        throw cache.promise;
      }
      throw error;
    }
  }, [ query.status, status, fetch, data, error ]);

  const write = cache.setData;

  useEffect(() => {
    switch (query.status) {
    case Status.LOADING:
      if (status === Status.IDLE) {
        setState(query);
      }
      break;
    case Status.SUCCESS:
    case Status.ERROR:
      if (data !== query.data || error !== query.error) {
        setState(query);
      }
      break;
    }
  }, [ query.status, query.data, query.error ]);

  useEffect(cache.subscribe, deps);

  return useMemo(() => {
    const r: Query<T> = {
      isFetching: query.status === Status.LOADING,
      status,
      invalidate,
      data: null,
    };
    Object.defineProperty(r, 'data', {
      get: read,
      set: write,
    });

    return r;
  }, [ query.status, status, invalidate, read, write ]);
};

export default useQuery;
