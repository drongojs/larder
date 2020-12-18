import {
  useRef,
  useEffect,
  useReducer,
  Reducer,
} from 'react';
import {
  Deps,
  Query,
  Status,
  useCache,
} from '@respite/core';

type QueryMatcher = Query<any> | Deps | string;

interface State<T>{
  status: Status,
  data: T,
  error: any,
}
const initialState: State<any> = {
  status: Status.IDLE,
  data: null,
  error: null,
};

const reducer = <T>(state: State<T>, action: any) => {
  switch (action.type) {
  case 'PENDING':
    return {
      status: Status.LOADING,
      data: null,
      error: null,
    };
  case 'SUCCESS':
    return {
      status: Status.SUCCESS,
      data: action.data,
      error: null,
    };
  case 'ERROR':
    return {
      status: Status.ERROR,
      data: null,
      error: action.error,
    };
  default:
    return state;
  }
};

export default function useAction<T, F extends (...args: any[]) => Promise<T>>(
  callback: F,
  ...queries: Array<QueryMatcher>
) {
  const cache = useCache();
  const mounted = useRef(true);
  const [ state, dispatch ] = useReducer<Reducer<State<T>, any>>(reducer, initialState);
  const {
    data,
    error,
    status,
  } = state;

  useEffect(() => () => {
    mounted.current = false;
  }, []);

  const action = async(...args: Parameters<F>) => {
    let result: T;
    let error: any;
    let errored = false;
    if (mounted.current) {
      dispatch({
        type: 'PENDING',
      });
    }
    try {
      result = await callback(...args);
      if (mounted.current) {
        dispatch({
          type: 'SUCCESS',
          data: result,
        });
      }
    } catch (e) {
      errored = true;
      error = e;
      if (mounted.current) {
        dispatch({
          type: 'ERROR',
          error: e,
        });
      }
    }

    if (errored) {
      throw error;
    }

    if (mounted.current) {
      queries.forEach(matcher => {
        if (typeof matcher === 'string') {
          cache.invalidate({
            deps: [ matcher ],
            exact: false,
          });
        } else if (Array.isArray(matcher)) {
          cache.invalidate({
            deps: matcher,
            exact: true,
          });
        } else {
          matcher?.invalidate?.({ exact: true });
        }
      });
    }
  };

  return {
    action,
    status,
    data,
    error,
    submitting: status === Status.LOADING,
  };
}
