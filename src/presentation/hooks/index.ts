import { useState, useCallback, useRef, useMemo } from 'react';
import { JpexInstance } from 'jpex';
import { useJpex } from 'react-jpex';
import { useLocation, useHistory } from 'react-router';

export const useToggle = (defaultValue = false) => {
  const [ value, setValue ] = useState(defaultValue);
  const turnOn = useCallback(() => setValue(true), [ setValue ]);
  const turnOff = useCallback(() => setValue(false), [ setValue ]);
  const toggle = useCallback(() => setValue(!value), [ setValue, value ]);

  return [ value, toggle, turnOn, turnOff, setValue ] as [
    typeof value,
    typeof toggle,
    typeof turnOn,
    typeof turnOff,
    typeof setValue,
  ];
};

// eslint-disable-next-line max-len
export const useQueryState = <T extends string>(key: string, fallback: T): [ T, (v: T) => void ] => {
  const location = useLocation();
  const history = useHistory();

  const state = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get(key) ?? fallback) as T;
  }, [ location.search, key ]);
  const setState = useCallback((value: T) => {
    const params = new URLSearchParams(location.search);
    params.set(key, value);
    const search = params.toString();
    history.replace({ search });
  }, [ location.search, key, history ]);

  return [ state, setState ];
};
