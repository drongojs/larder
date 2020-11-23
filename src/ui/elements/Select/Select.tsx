import React, { KeyboardEvent, useState, useMemo, useRef } from 'react';
import { css } from 'linaria';
import TextInput, { Suffix } from '../TextInput';
import theme from 'ui/theme';
import Option from './Option';

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
        display: block;
        border-bottom-left-radius: ${theme.curvature}px;
        border-bottom-right-radius: ${theme.curvature}px;
      }
    }
  `,
  list: css`
    display: none;
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
  const [ focused, setFocused ] = useState(false);
  const listRef = useRef<HTMLUListElement>();

  const allOptions = useMemo(() => (props.options).map(obj => {
    const key = getKey(obj);
    const searchText = getText(obj);

    return {
      key,
      searchText,
      value: obj,
    };
  }), [ props.options ]);

  const filteredOptions = useMemo(() => allOptions.filter(option => {
    if (!search) {
      return true;
    }
    const searchText = option.searchText.toLowerCase();
    const lSearch = search.toLowerCase();
    if (lSearch === searchText) {
      return true;
    }
    if (searchText.includes(lSearch)) {
      return true;
    }
    return false;
  }), [ allOptions, search ]);

  const optionElements = filteredOptions.map(option => {
    return (
      <Option
        key={option.key}
        selected={option.value === value}
        value={option.value}
        onClick={() => {
          onChange(option.value);
        }}
      >
        {render(option.value)}
      </Option>
    );
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowDown') {
      // @ts-ignore
      listRef.current.firstChild?.focus();
    }
  };

  const valueText = value ? getText(value) : '';

  const canAdd = onAdd != null && Boolean(search) && search !== valueText;

  return (
    <div
      className={styles.root}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <TextInput
        placeholder={valueText}
        value={focused ? search: valueText}
        suffix={(
          <Suffix>
            <i className="fas fa-chevron-down" style={{ color: theme.palette.grey02.color }}/>
          </Suffix>
        )}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ul ref={listRef} className={styles.list}>
        {optionElements}
        <If condition={canAdd}>
          <Option
            selected={false}
            value={void 0}
            onClick={async() => {
              setSearch(await onAdd(search));
            }}
          >
            {`add ${search}`}
          </Option>
        </If>
      </ul>
    </div>
  );
};

export default Select;
