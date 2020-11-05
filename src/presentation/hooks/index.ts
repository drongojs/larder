import { useState, useCallback, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router';
import { tuple } from 'crosscutting/utils';

export const useToggle = (defaultValue = false) => {
  const [ value, setValue ] = useState(defaultValue);
  const toggle = useCallback((v = !value) => setValue(v), [ setValue, value ]);

  return tuple([ value, toggle ]);
};

export const useQueryState = (key: string, fallback: string) => {
  const location = useLocation();
  const history = useHistory();

  const state = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get(key) ?? fallback;
  }, [ location.search, key ]);

  const setState = useCallback((value: string) => {
    const params = new URLSearchParams(location.search);
    params.set(key, value);
    const search = params.toString();
    history.replace({ search });
  }, [ location.search, key, history ]);

  return tuple([ state, setState ]);
};
