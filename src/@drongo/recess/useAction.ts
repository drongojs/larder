import {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { Resource } from './types';
import { tuple } from 'crosscutting/utils';

const useAction = <T, F extends (...args: any[]) => (Promise<T> | T)>(
  fn: F,
  deps: any[],
  resources: Resource<any>[] = []
) => {
  const mountedRef = useRef(true);
  const [ pending, setPending ] = useState(false);
  const [ error, setError ] = useState(void 0);

  useEffect(() => () => {
    mountedRef.current = false;
  }, []);

  const action = useCallback(async(...args: Parameters<F>) => {
    let result: T;
    let error: any;
    if (mountedRef.current) {
      setPending(true);
      setError(void 0);
    }
    try {
      result = await fn(...args);
    } catch (e) {
      if (mountedRef.current) {
        setError(e);
      }
      error = e;
    }
    if (mountedRef.current) {
      setPending(false);
    }

    if (error) {
      throw error;
    }
    
    if (mountedRef.current) {
      resources.forEach(resource => resource.invalidate());
    }

    return result;
  }, [ setPending, setError, ...resources, ...deps ]);

  return tuple([ action, pending, error ]);
};

export default useAction;
