import React, { KeyboardEvent, useState, useRef, useEffect } from 'react';
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
  value?: any,
  options?: any[],
  getKey?: (obj: any) => string,
  getText?: (obj: any) => string,
  render?: (obj: any) => (JSX.Element | string),
  onChange?: (e: any) => void,
  onAdd?: (text: string) => any,
}

const Select = ({
  getKey = (x: any) => `${x}`,
  getText = getKey,
  render = getText,
  value,
  onChange,
  onAdd,
  ...props
}: Props) => {
  const [ search, setSearch ] = useState('');
  const [ focused, _setFocused ] = useState(false);
  const inputRef = useRef<HTMLInputElement>();
  const listRef = useRef<HTMLUListElement>();
  const blurHandleRef = useRef<any>();

  const setFocused = (value: boolean) => {
    _setFocused(value);
    if (!value) {
      setSearch('');
    }
  };

  useEffect(() => () => {
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
      if (Array.from(listRef.current.children).includes(active)) {
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
          getKey={getKey}
          getText={getText}
          onAdd={onAdd}
          onChange={onChange}
          options={props.options}
          render={render}
          search={search}
          setFocused={setFocused}
          value={value}
          ref={listRef}
          onKeyDown={handleKeyUp}
        />
      </If>
    </div>
  );
};

export default Select;
