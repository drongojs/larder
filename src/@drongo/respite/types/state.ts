import { Status } from './';
import { Action } from './actions';
import { Dispatch } from 'react';

export interface CachedQuery<T> {
  key: string,
  status: Status,
  data?: T,
  error?: any,
  subscribers: number,
}

export interface QueryCache<T> {
  [key: string]: CachedQuery<T>,
}

export interface Promises<T> {
  current: {
    [key: string]: Promise<T>,
  },
}

export interface Context<T> {
  promises: Promises<T>,
  cache: QueryCache<T>,
  dispatch: Dispatch<Action<T>>,
}
