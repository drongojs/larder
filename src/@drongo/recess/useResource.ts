import {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  Dispatch,
  MutableRefObject,
} from 'react';
import {
  Action,
  ActionType,
  CancellablePromise,
  Status,
  Resource,
  Cache,
} from './types';
import useReducer from './reducer';
import useCache from './useCache';
import { after } from 'crosscutting/utils';

type CallbackType<T> = () => (Promise<T> | T);

const makeMakeStale = <T>(dispatch: Dispatch<Action<T>>) => () => {
  // mark the resource as stale, we don't refetch immediately but when the resource is next read
  // we also don't want to invalidate the cache in this function as we're quite happy to take the
  // cached value right now...
  dispatch({ type: ActionType.INVALIDATE });
};

// invalidate the cache and flag the query as stale
const makeInvalidate = <T>(makeStale: () => void, cache: Cache<T>) => (deps?: any[]) => {
  cache.clear(deps);
  makeStale();
};

const makeFetch = <T>(
  dispatch: Dispatch<Action<T>>,
  cache: Cache<T>,
  cb: CallbackType<T>,
  promiseRef: MutableRefObject<CancellablePromise<any>>,
) => () => {
  /* eslint-disable no-param-reassign */
  // if we're already fetching from a previous request, we want to flag it as cancelled
  promiseRef.current?.cancel?.();

  // after every asynchronous step we want to check if the request has been cancelled
  // and if so, just stop entirely
  let cancelled = false;

  const p: CancellablePromise<any> = promiseRef.current = Promise.resolve().then(async() => {
    // to avoid infinite refreshes and weird rendering loops we want to wait 1 tick before doing anything
    await after(0);
    if (cancelled) {
      return;
    }
    dispatch({ type: ActionType.FETCHING });

    try {
      const res = cache.cached ? cache.data : await cb();
      if (cancelled) {
        return;
      }
      dispatch({
        type: ActionType.SUCCESS,
        payload: res,
      });
      cache.data = res;
      promiseRef.current = null;
    } catch (e) {
      if (cancelled) {
        return;
      }
      dispatch({
        type: ActionType.FAILURE,
        payload: e,
      });
      cache.error = e;
      promiseRef.current = null;
    }
  });

  p.cancel = () => {
    cancelled = true;
  };
  /* eslint-enable no-param-reassign */
  };

const makeRead = <T>(
  stale: boolean,
  fetch: CallbackType<T>,
  status: Status,
  data: T,
  err: any,
  promiseRef: MutableRefObject<CancellablePromise<any>>,
) => () => {
    if (stale) {
      fetch();
    }
    switch (status) {
    case Status.LOADING:
      throw promiseRef.current;
    case Status.SUCCESS:
      return data;
    case Status.ERROR:
      throw err;
    }
  };

const makeWrite = <T>(
  dispatch: Dispatch<Action<T>>,
  cache: Cache<T>,
) => (value: T) => {
    dispatch({
      type: ActionType.SUCCESS,
      payload: value,
    });
    // eslint-disable-next-line no-param-reassign
    cache.data = value;
  };

const useEffectAfterMount = (cb: () => void, deps: any[]) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      cb();
    } else {
      mounted.current = true;
    }
  }, deps);
};

const useResource = <T>(
  rawCb: CallbackType<T>,
  deps: any[],
): Resource<T> => {
  const cache = useCache(deps);
  const promiseRef = useRef<CancellablePromise<T>>();
  const cb = useCallback(rawCb, deps);
  const [ state, dispatch ] = useReducer();
  const {
    data,
    err,
    fetching,
    status,
    stale,
  } = state;

  const makeStale = useCallback(makeMakeStale(dispatch), [ dispatch ]);
  const invalidate = useCallback(makeInvalidate(makeStale, cache), [ makeStale, cache ]);
  const fetch = useCallback(makeFetch(dispatch, cache, cb, promiseRef), [ dispatch, cache, cb ]);
  // eslint-disable-next-line max-len
  const read = useCallback(makeRead(stale, fetch, status, data, err, promiseRef), [ stale, fetch, status, data, err ]);
  const write = useCallback(makeWrite(dispatch, cache), [ dispatch, cache ]);

  // whenever the deps change we want to mark the resource as stale
  // (but not on the very first render)
  useEffectAfterMount(makeStale, deps);

  // we want to wind down any pending promises when the component unmounts...
  useEffect(() => () => {
    promiseRef.current?.cancel?.();
  }, []);

  return useMemo(() => {
    const r: Resource<T> = {
      invalidate,
      isFetching: fetching,
      status,
      data: null,
    };
    // make "data" a getter/setter that does all of the legwork
    Object.defineProperty(r, 'data', { 
      get: read,
      set: write,
    });
    return r;
  }, [ invalidate, fetching, status, read, write ]);
};

export default useResource;
