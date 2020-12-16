import {
  CallbackType,
  Deps,
} from './utils';
import { CachedQuery } from './state';
import { ActionInvalidate } from './actions';

export * from './actions';
export * from './state';
export * from './utils';

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  FETCHING = 'refetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Query<T = any> {
  data: T,
  status: Status,
  invalidate: Cache<T>['invalidate'],
  prefetch: () => void,
  reset: () => void,
}

export interface Cache<T> {
  invalidate: (args?: Omit<ActionInvalidate, 'type' | 'deps'>) => void,
  setData: (value: T) => void,
  setError: (error: any) => void,
  setFetching: () => void,
  subscribe: () => () => void,
  query: CachedQuery<T>,
  promise: Promise<T>,
}

export type UseQuery = <T = any>(
  callback: CallbackType<T>,
  deps: Deps,
) => Query<T>;

export type UseAction = <T, F extends (...args: any[]) => Promise<T>>(
  callback: F,
  deps: any[],
  ...queries: Array<Query | Deps | string>
) => [ F, boolean, any ];
