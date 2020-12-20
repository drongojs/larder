import { ActionType } from './constants';
import { useContext } from './context';
import { CachedQuery, Deps } from './types';
import { getQuery, serialize } from './utils';

export default function useCache<T>() {
  const { cache, dispatch, promises, subscribers } = useContext<T>();

  const pGetQuery = (deps: Deps) => getQuery<T>(cache, deps);

  const getPromise = (deps: Deps) => {
    const keys = serialize(deps);
    return promises.current[keys];
  };
  const setPromise = (deps: Deps, promise: Promise<T>) => {
    const keys = serialize(deps);
    promises.current[keys] = promise;
  };

  const invalidate = ({
    exact,
    deps,
    predicate,
  }: {
    deps: Deps,
    exact?: boolean,
    predicate?: (query: CachedQuery<any>, key: string) => boolean,
  }) => {
    dispatch({
      type: ActionType.INVALIDATE,
      deps,
      exact: Boolean(exact),
      predicate,
    });
  };

  const fetching = ({ deps }: { deps: Deps }) => {
    dispatch({
      type: ActionType.FETCHING,
      deps,
    });
  };

  const success = ({ deps, data }: { deps: Deps, data: any }) => {
    dispatch({
      type: ActionType.SUCCESS,
      deps,
      data,
    });
    setPromise(deps, null);
  };

  const failure = ({ deps, error }: { deps: Deps, error: any }) => {
    dispatch({
      type: ActionType.FAILURE,
      deps,
      error,
    });
    setPromise(deps, null);
  };

  const subscribe = (deps: Deps) => {
    const keys = serialize(deps);
    subscribers.current[keys] = (subscribers.current[keys] ?? 0) + 1;
  };
  const unsubscribe = (deps: Deps) => {
    const keys = serialize(deps);
    subscribers.current[keys] = (subscribers.current[keys] ?? 0) - 1;
  };

  return {
    getQuery: pGetQuery,
    getPromise,
    setPromise,
    invalidate,
    fetching,
    success,
    failure,
    subscribe,
    unsubscribe,
  };
}
