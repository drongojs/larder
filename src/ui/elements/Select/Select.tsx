import React, { KeyboardEvent, useState, useRef, useEffect, ReactNode } from 'react';
import { css } from 'linaria';
import * as theme from 'ui/theme';
import Options from './Options';
import Input from './Input';

const styles = {
  root: css`
    position: relative;

    &:focus-within {
      input, input~* {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-width: 0;
        border-color: ${theme.palette.primary.color};
      }
      ul {
        border-bottom-left-radius: ${theme.curvature}px;
        border-bottom-right-radius: ${theme.curvature}px;
      }
    }
  `,
};

interface Props {
  id?: string,
  value?: any,
  children?: ReactNode,
  getText?: (x: any) => string,
  onChange?: (e: any) => void,
}

const Select = ({
  id,
  value,
  getText = (x: any) => x.toString(),
  onChange,
  children,
}: Props) => {
  const mountedRef = useRef(true);
  const [ search, setSearch ] = useState('');
  const [ focused, _setFocused ] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const listRef = useRef<HTMLUListElement>();
  const blurHandleRef = useRef<any>();

  const setFocused = (value: boolean) => {
    if (!mountedRef.current) {
      return;
    }
    _setFocused(value);
    if (!value) {
      setSearch('');
    }
  };

  useEffect(() => () => {
    mountedRef.current = false;
    if (blurHandleRef.current != null) {
      clearTimeout(blurHandleRef.current);
    }
  }, []);

  const onFocus = () => setFocused(true);
  const onBlur = () => {
    blurHandleRef.current = setTimeout(() => {
      blurHandleRef.current = null;
      const active = document.activeElement;
      if (inputRef.current === active) {
        return;
      }
      if (listRef.current && Array.from(listRef.current.children).includes(active)) {
        return;
      }
      setFocused(false);
    }, 100);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowDown') {
      // @ts-ignore
      listRef.current?.firstChild?.focus();
    }
  };
  const handleKeyUp = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowUp') {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={styles.root}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Input
        id={id}
        focused={focused}
        getText={getText}
        search={search}
        setSearch={setSearch}
        value={value}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <If condition={focused}>
        <Options
          onChange={onChange}
          search={search}
          setFocused={setFocused}
          value={value}
          ref={listRef}
          onKeyDown={handleKeyUp}
        >
          {children}
        </Options>
      </If>
    </div>
  );
};

export default Select;
