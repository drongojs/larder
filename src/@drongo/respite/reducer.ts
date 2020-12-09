import { useReducer } from 'react';
import {
  Action,
  ActionFailure,
  ActionFetching,
  ActionInvalidate,
  ActionSuccess,
  ActionType,
  QueryCache,
  Status,
  ActionSubscribe,
  ActionUnsubscribe,
  CachedQuery,
} from './types';
import { getQuery, serialize } from './utils';

const initialState = {};

// TODO: need an intermittent process that cleans up stale queries
// TODO: when you invalidate a query you want to invalidate all queries for the "primary" key

const subscribe = <T>(state: QueryCache<T>, action: ActionSubscribe) => {
  const { deps } = action;
  const [ key, query ] = getQuery(state, deps);

  return {
    ...state,
    [key]: {
      ...query,
      subscribers: query.subscribers + 1,
    },
  };
};

// I'm slightly concerned that this will never be triggered when a component throws an error or suspends
const unsubscribe = <T>(state: QueryCache<T>, action: ActionUnsubscribe) => {
  const { deps } = action;
  const [ key, query ] = getQuery(state, deps);

  return {
    ...state,
    [key]: {
      ...query,
      subscribers: query.subscribers - 1,
    },
  };
};

// not sure if this is the best way to handle invalidation
// right now it literally just wipes every query for the primary key
// should we really just be invalidating the "exact" key passed in?
const invalidate = <T>(state: QueryCache<T>, action: ActionInvalidate) => {
  const { deps, exact } = action;
  const key = exact ? serialize(deps) : deps[0];
  const predicate = action.predicate ?? ((query: CachedQuery<T>, queryKey) => {
    const comparitor = exact ? queryKey : query.key;
    return comparitor === key;
  });

  return Object
    .entries(state)
    .filter(([ queryKey, query ]) => !predicate(query, queryKey))
    .reduce((acc, [ key, query ]) => {
      return {
        ...acc,
        [key]: query,
      };
    }, {});
};

const fetching = <T>(state: QueryCache<T>, action: ActionFetching) => {
  const { deps } = action;
  const [ key, query ] = getQuery(state, deps);

  return {
    ...state,
    [key]: {
      ...query,
      status: Status.LOADING,
    },
  };
};

const success = <T>(state: QueryCache<T>, action: ActionSuccess<T>) => {
  const { deps, data } = action;
  const [ key, query ] = getQuery(state, deps);

  return {
    ...state,
    [key]: {
      ...query,
      status: Status.SUCCESS,
      data,
      error: void 0,
    },
  };
};

const failure = <T>(state: QueryCache<T>, action: ActionFailure) => {
  const { deps, error } = action;
  const [ key, query ] = getQuery(state, deps);

  return {
    ...state,
    [key]: {
      ...query,
      status: Status.ERROR,
      data: void 0,
      error,
    },
  };
};

const reducer = <T>(state: QueryCache<T>, action: Action<T>) => {
  switch (action.type) {
  case ActionType.SUBSCRIBE:
    return subscribe(state, action);
  case ActionType.UNSUBSCRIBE:
    return unsubscribe(state, action);
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
