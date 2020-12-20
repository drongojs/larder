import { Dispatch, useEffect } from 'react';
import { ActionType } from './constants';
import { Promises, Subscribers } from './types';

const useCleanup = (dispatch: Dispatch<any>, cacheTime: number, promises: Promises<any>, subscribers: Subscribers) => {
  useEffect(() => {
    if (cacheTime < Infinity) {
      const handle = setInterval(() => {
        dispatch({
          type: ActionType.INVALIDATE,
          deps: null,
          predicate: (query, key) => {
            if (promises.current[key]) {
              return false;
            }
            if (subscribers.current[key] > 0) {
              return false;
            }
            return true;
          },
        });
        Object.keys(promises.current).forEach(key => {
          if (!promises.current[key]) {
            delete promises.current[key];
          }
        });
        Object.keys(subscribers.current).forEach(key => {
          if (!subscribers.current[key]) {
            delete subscribers.current[key];
          }
        });
      }, cacheTime);
      return () => clearInterval(handle);
    }
  }, [ cacheTime ]);
};

export default useCleanup;