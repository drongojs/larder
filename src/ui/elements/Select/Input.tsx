import { cx } from 'linaria';
import React, { forwardRef } from 'react';
import * as theme from 'ui/theme';
import TextInput, { Suffix } from '../TextInput';

interface Props {
  id?: string,
  search: string,
  value: any,
  focused: boolean,
  getText: (obj: any) => string,
  setSearch: (v: string) => void,
  onKeyDown: (e: any) => void,
}

const Input = forwardRef(({
  id,
  search,
  value,
  getText,
  focused,
  setSearch,
  onKeyDown,
}: Props, ref: any) => {
  const valueText = value ? getText(value) : '';

  return (
    <TextInput
      id={id}
      aria-autocomplete="list"
      placeholder={valueText}
      value={focused ? search: valueText}
      suffix={(
        <Suffix>
          <i
            className={cx('fas', focused ? 'fa-chevron-up' : 'fa-chevron-down')}
            style={{ color: theme.palette.grey02.color }}
          />
        </Suffix>
      )}
      ref={ref}
      onChange={e => setSearch(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
});
Input.displayName = 'Input';

export default Input;
