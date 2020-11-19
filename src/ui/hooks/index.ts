import { useEffect, useState, useCallback } from 'react';
import { tuple } from 'crosscutting/utils';

export const useToggle = (defaultValue = false) => {
  const [ value, setValue ] = useState(defaultValue);
  const toggle = useCallback((v = !value) => setValue(v), [ setValue, value ]);

  return tuple([ value, toggle ]);
};

export const useTimeoutEffect = (
  n: number,
  cb: () => (void | (() => void)),
  deps?: any[],
) => {
  useEffect(() => {
    let result: any;
    const handle = setTimeout(() => {
      result = cb();
    }, n);

    return () => {
      clearTimeout(handle);
      if (typeof result === 'function') {
        result();
      }
    };
  }, [ n, ...deps ]);
};
