import React, { forwardRef } from 'react';
import { css } from 'linaria';
import * as theme from 'ui/theme';
import Option from './Option';

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
  options: any[],
  search: string,
  getKey: (obj: any) => string,
  getText: (obj: any) => string,
  render: (obj: any) => (JSX.Element | string),
  onAdd: (text: string) => any,
  onChange: (e: any) => void,
  setFocused: (v: boolean) => void,
  onKeyDown: (e: any) => void,
}

const Options = forwardRef(({
  value,
  options,
  getKey,
  getText,
  search,
  onAdd,
  onChange,
  setFocused,
  render,
  onKeyDown,
}: Props, ref: any) => {
  const lSearch = search?.toLowerCase?.() ?? '';
  const valueText = value ? getText(value) : '';
  const canAdd = onAdd != null && Boolean(search) && search !== valueText;

  const optionElements = options.reduce((arr, option, i) => {
    const key = getKey(option);
    const searchText = getText(option).toLowerCase();
    if (lSearch) {
      if (lSearch !== searchText && !searchText.includes(lSearch)) {
        return arr;
      }
    }
    
    const node = (
      <Option
        key={key}
        selected={option === value}
        value={option}
        onClick={() => {
          onChange(option);
          setFocused(false);
        }}
        onKeyDown={i === 0 ? onKeyDown : void 0}
      >
        {render(option)}
      </Option>
    );

    return arr.concat(node);
  }, []);

  return (
    <ul ref={ref} className={styles.list}>
      {optionElements}
      <If condition={canAdd}>
        <Option
          selected={false}
          value={void 0}
          onClick={async() => {
            // setSearch(await onAdd(search));
            await onAdd(search);
            setFocused(false);
          }}
        >
          {`add ${search}`}
        </Option>
      </If>
    </ul>
  );
});
Options.displayName = 'Options';

export default Options;
