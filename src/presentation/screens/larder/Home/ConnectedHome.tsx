import React, { useMemo, useCallback } from 'react';
import Home from './Home';
import {
  useFilter,
  useGrouped,
  useSearch,
} from './hooks';
import { useRegister } from 'react-jpex';
import larder from 'infrastructure/stock';
import ingredients from 'infrastructure/ingredients';
import categories from 'infrastructure/categories';
import { enhance } from 'presentation/hocs';
import { useStock } from 'domain/queries/stock';
import { useId, parseSearch } from 'domain/selectors';
import { useHistory } from 'react-router';

const ConnectedHome = () => {
  useRegister(larder, ingredients, categories);
  const [ filter, setFilter ] = useFilter();
  const [ grouped, toggleGrouped ] = useGrouped();
  const [ search, setSearch ] = useSearch();
  const { name: query } = useMemo(() => parseSearch(search), [ search ]);
  const stockQuery = useStock({
    type: 'larder',
    search: query,
  });
  const id = useId();
  const history = useHistory();
  const onCloseModal = useCallback(() => {
    history.push('/larder');
  }, [ history ]);

  return (
    <Home
      id={id}
      filter={filter}
      setFilter={setFilter}
      grouped={grouped}
      toggleGrouped={toggleGrouped}
      search={search}
      setSearch={setSearch}
      stockQuery={stockQuery}
      onCloseModal={onCloseModal}
    />
  );
};

export default enhance('ConnecteHome')(ConnectedHome);
