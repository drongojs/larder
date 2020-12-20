import { useReducer } from 'react';
import { ActionType, Status } from './constants';
import {
  Action,
  ActionFailure,
  ActionFetching,
  ActionInvalidate,
  ActionSuccess,
  QueryCache,
  CachedQuery,
  Deps,
} from './types';
import { getQuery, serialize } from './utils';

const initialState = {};

const invalidate = <T>(state: QueryCache<T>, action: ActionInvalidate) => {
  const { deps, exact } = action;
  const key = action.predicate ? void 0 : exact ? serialize(deps) : deps[0];
  const predicate = action.predicate ?? ((query: CachedQuery<T>, queryKey) => {
    const comparitor = exact ? queryKey : query.key;
    return comparitor === key;
  });

  return Object
    .entries(state)
    .reduce((acc, [ key, query ]) => {
      if (!predicate(query, key)) {
        return acc;
      }
      return {
        ...acc,
        [key]: query,
      };
    }, {});
};

const updateQuery = <T>(state: QueryCache<T>, deps: Deps, props: Partial<CachedQuery<T>>) => {
  const [ key, query ] = getQuery(state, deps);
  return {
    ...state,
    [key]: {
      ...query,
      ...props,
    },
  };
};

const fetching = <T>(state: QueryCache<T>, action: ActionFetching) => {
  const { deps } = action;
  return updateQuery(state, deps, { status: Status.LOADING });
};

const success = <T>(state: QueryCache<T>, action: ActionSuccess<T>) => {
  const { deps, data } = action;
  return updateQuery(state, deps, {
    status: Status.SUCCESS,
    data,
    error: void 0,
  });
};

const failure = <T>(state: QueryCache<T>, action: ActionFailure) => {
  const { deps, error } = action;
  return updateQuery(state, deps, {
    status: Status.ERROR,
    data: void 0,
    error,
  });
};

const reducer = <T>(state: QueryCache<T>, action: Action<T>) => {
  switch (action.type) {
  case ActionType.INVALIDATE:
    return invalidate(state, action);
  case ActionType.FETCHING:
    return fetching(state, action);
  case ActionType.SUCCESS:
    return success(state, action);
  case ActionType.FAILURE:
    return failure(state, action);
  default:
    return state;
  }
};

export default () => useReducer(reducer, initialState);
