import { Deps } from './utils';
import { CachedQuery } from './state';

export enum ActionType {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
  INVALIDATE = 'INVALIDATE',
  FETCHING = 'FETCHING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface ActionSubscribe {
  type: ActionType.SUBSCRIBE,
  deps: Deps,
}

export interface ActionUnsubscribe {
  type: ActionType.UNSUBSCRIBE,
  deps: Deps,
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
export type Action<T> = ActionSubscribe | ActionUnsubscribe | ActionInvalidate | ActionFetching | ActionSuccess<T> | ActionFailure;
