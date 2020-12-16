import React, { forwardRef, ReactNode } from 'react';
import { css } from 'linaria';
import * as theme from 'ui/theme';
import { Provider } from './context';

const styles = {
  list: css`
    z-index: 1;
    position: absolute;
    background-color: ${theme.palette.white.color};
    color: ${theme.palette.white.contrast};
    border: 2px solid ${theme.palette.primary.color};
    border-top: 1px solid ${theme.palette.grey01.color};
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 2px 2px 5px ${theme.palette.grey01.color};
`,
};

interface Props {
  value: any,
  search: string,
  children?: ReactNode,
  onChange: (e: any) => void,
  setFocused: (v: boolean) => void,
  onKeyDown: (e: any) => void,
}

const Options = forwardRef(({
  value,
  search,
  onChange,
  setFocused,
  onKeyDown,
  children,
}: Props, ref: any) => {
  const state = {
    value,
    search: search.toLowerCase(),
    onClick: (value: any) => {
      onChange(value);
      setFocused(false);
    },
    onKeyDown,
    setFocused,
  };
  return (
    <Provider value={state}>
      <ul
        ref={ref}
        className={styles.list}
        role="listbox"
      >
        {children}
      </ul>
    </Provider>
  );
});
Options.displayName = 'Options';

export default Options;
