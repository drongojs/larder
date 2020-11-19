import { useReducer } from 'react';
import {
  State,
  Action,
  Status,
  ActionType,
} from './types';

const initialState: State<any> = {
  data: void 0,
  err: void 0,
  fetching: false,
  stale: true,
  status: Status.LOADING,
};

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
  case ActionType.INVALIDATE:
    return {
      ...state,
      stale: true,
      // if we're in an error state, re-fetching should just reset the status
      status: state.status === Status.ERROR ? Status.LOADING : state.status,
    };
  case ActionType.FETCHING:
    return {
      ...state,
      stale: false,
      fetching: true,
    };
  case ActionType.SUCCESS:
    return {
      data: action.payload,
      err: void 0,
      stale: false,
      fetching: false,
      status: Status.SUCCESS,
    };
  case ActionType.FAILURE:
    return {
      data: void 0,
      err: action.payload,
      stale: false,
      fetching: false,
      status: Status.ERROR,
    };
  }
};

export default () => useReducer(reducer, initialState);
