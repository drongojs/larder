import { Dispatch } from 'react';
import { ActionType, Status } from '../constants';

export interface Query<T = any> {
  data: T,
  status: Status,
  invalidate: (args?: { exact?: boolean }) => void,
  prefetch: () => void,
  reset: () => void,
}

export type CallbackType<T> = () => (Promise<T> | T);

export type Deps = [ any, ...any[] ];

export interface CachedQuery<T> {
  key: any,
  status: Status,
  data?: T,
  error?: any,
}

export interface QueryCache<T> {
  [key: string]: CachedQuery<T>,
}

export interface Promises<T> {
  current: {
    [key: string]: Promise<T>,
  },
}

export interface Subscribers {
  current: {
    [key: string]: number,
  },
}

export interface Context<T> {
  promises: Promises<T>,
  subscribers: Subscribers,
  cache: QueryCache<T>,
  dispatch: Dispatch<Action<T>>,
}

export interface ActionInvalidate {
  type: ActionType.INVALIDATE,
  deps: Deps,
  exact?: boolean,
  predicate?: (query: CachedQuery<any>, key: string) => boolean,
}
export interface ActionFetching {
  type: ActionType.FETCHING,
  deps: Deps,
}
export interface ActionSuccess<T> {
  type: ActionType.SUCCESS,
  deps: Deps,
  data: T,
}
export interface ActionFailure {
  type: ActionType.FAILURE,
  deps: Deps,
  error: any,
}

// eslint-disable-next-line max-len
export type Action<T> = ActionInvalidate | ActionFetching | ActionSuccess<T> | ActionFailure;
