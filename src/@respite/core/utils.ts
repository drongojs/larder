import { QueryCache, Deps, CachedQuery } from './types';
import { tuple } from 'crosscutting/utils';
import { Status } from './constants';

export const serialize = (obj: any) => JSON.stringify(obj);

export const getQuery = <T>(cache: QueryCache<T>, deps: Deps): [ string, CachedQuery<T> ] => {
  const keys = serialize(deps);
  const query = cache[keys] ?? {
    key: deps[0],
    status: Status.IDLE,
  };

  return tuple([ keys, query ]);
};
