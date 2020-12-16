import { useRef, useEffect } from 'react';
import { QueryCache, Deps, CachedQuery, Status } from './types';
import { tuple } from 'crosscutting/utils';

export const useEffectAfterMount = (cb: () => any, deps: any[]) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      return cb();
    } else {
      mounted.current = true;
    }
  }, deps);
};

export const serialize = (obj: any) => JSON.stringify(obj);

export const getQuery = <T>(cache: QueryCache<T>, deps: Deps): [ string, CachedQuery<T> ] => {
  const keys = serialize(deps);
  const query = cache[keys] ?? {
    key: deps[0],
    status: Status.IDLE,
  };

  return tuple([ keys, query ]);
};
