export interface CancellablePromise<T> extends Promise<T> {
  cancel?: () => void,
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum ActionType {
  INVALIDATE = 'INVALIDATE',
  FETCHING = 'FETCHING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface State<T> {
  status: Status,
  stale: boolean,
  fetching: boolean,
  data: T,
  err: any,
}

export interface Resource<T = any> {
  data: T
  isFetching: boolean,
  status: Status,
  invalidate: (deps?: any[]) => void,
}

export interface Action<T> {
  type: ActionType,
  payload?: T,
}

export interface Cache<T> {
  cached: boolean,
  data: T,
  error: any,
  clear: (deps?: any[]) => void,
}
