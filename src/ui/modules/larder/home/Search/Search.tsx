import React from 'react';
import { css } from 'linaria';
import TextInput, { Suffix } from 'ui/elements/TextInput';
import { Spinner } from 'ui/elements/Progress';
import theme from 'ui/theme';

interface Props {
  value: string,
  submitting: boolean,
  onChange: (v: string) => void,
  onSubmit: (evt: any) => any,
}

const styles = {
  root: css`
    margin-bottom: 1rem;
  `,
  suffix: css`
    display: flex;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
  `,
  icon: css`
    color: ${theme.palette.grey02.color};
  `,
};

const Icon = ({ submitting }: { submitting: boolean }) => {
  if (submitting) {
    return (
      <Spinner size={30}/>
    );
  }
  return (
    <i className={`fas fa-search ${styles.icon}`}/>
  );
};

const Search = ({
  value,
  submitting,
  onSubmit,
  onChange,
}: Props) => (
  <form onSubmit={onSubmit}>
    <div className={styles.root}>
      <TextInput
        id="stock-search-input"
        placeholder="Search or add"
        autoComplete="off"
        value={value}
        onChange={evt => onChange(evt.target.value)}
        suffix={(
          <Suffix className={submitting && styles.suffix}>
            <Icon submitting={submitting}/>
          </Suffix>
        )}
      />
    </div>
  </form>
);

export default Search;
