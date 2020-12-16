import { Deps } from './utils';
import { CachedQuery } from './state';

export enum ActionType {
  INVALIDATE = 'INVALIDATE',
  FETCHING = 'FETCHING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
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
