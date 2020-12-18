import {
  Status,
  Query,
} from '@respite/core';

export function staticQuery<T>(args: {
  status?: Status,
  data?: T,
  error?: any,
} = {}) {
  let {
    data,
    error,
    status = data ? Status.SUCCESS : error ? Status.ERROR : Status.LOADING,
  } = args;

  const query: Query<T> = {
    data: null,
    status,
    invalidate() {},
    prefetch() {},
    reset() {},
  };
  Object.defineProperty(query, 'data', {
    get() {
      switch (status) {
      case Status.IDLE:
      case Status.LOADING:
        throw new Promise(() => {});
      case Status.FETCHING:
      case Status.SUCCESS:
        return data;
      case Status.ERROR:
        throw error;
      default:
        throw new Error(`Unsupported status ${status}`);
      }
    },
  });

  return query;
}
