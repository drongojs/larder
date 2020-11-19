import {
  useState,
  useCallback,
} from 'react';
import { Resource } from './types';
import { tuple } from 'crosscutting/utils';

const useAction = <T, F extends (...args: any[]) => (Promise<T> | T)>(
  fn: F,
  deps: any[],
  resources: Resource<any>[] = []
) => {
  const [ pending, setPending ] = useState(false);
  const [ error, setError ] = useState(void 0);

  const action = useCallback(async(...args: Parameters<F>) => {
    let result: T;
    let error: any;
    setPending(true);
    setError(void 0);
    try {
      result = await fn(...args);
    } catch (e) {
      setError(e);
      error = e;
    }
    setPending(false);

    if (error) {
      throw error;
    }
    
    resources.forEach((resource) => resource.invalidate());

    return result;
  }, [ setPending, setError, ...resources, ...deps ]);

  return tuple([ action, pending, error ]);
};

export default useAction;
