import { useRef, useMemo } from 'react';
import { Cache } from './types';

interface CacheItem<T> {
  data?: T,
  error?: any,
}
interface CacheType<T> {
  [key: string]: CacheItem<T>,
}

const getKey = (deps: any[]) => JSON.stringify(deps);

export default <T>(deps: any[]): Cache<T> => {
  const cacheRef = useRef<CacheType<T>>({});

  const key = getKey(deps);

  return useMemo(() => {
    const clear = (deps?: any[]) => {
      if (deps == null) {
        cacheRef.current = {};
      } else {
        const key = getKey(deps);
        if (cacheRef.current[key]) {
          delete cacheRef.current[key];
        }
      }
    };
    const isCached = () => cacheRef.current[key] != null;
    const getData = () => {
      const cache = cacheRef.current[key];
      if (Object.prototype.hasOwnProperty.call(cache, 'data')) {
        return cache.data;
      }
      // if we don't have "data" then presumably we do have errors
      throw cache.error;
    };
    const setData = (data: T) => {
      cacheRef.current[key] = { data };
    };
    const setErr = (error: any) => {
      cacheRef.current[key] = { error };
    };

    const result = { clear } as Cache<T>;
    Object.defineProperties(result, {
      cached: {
        get: isCached,
      },
      data: {
        get: getData,
        set: setData,
      },
      error: {
        set: setErr,
      },
    });
    return result;
  }, [ key ]);
};
