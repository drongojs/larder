import { useCreate } from 'adapters/commands/stock';
import { useCategories } from 'adapters/queries/categories';
import { useSearchStock } from 'adapters/queries/stock';
import { parseSearch } from 'domain/selectors';
import { useState } from 'react';
import {
  useOnSubmit,
  useViewItem,
} from 'ui/screens/larder/Home/Screen/hooks';
import { connect } from 'ui/utils';
import Screen from './Screen';

const ConnectedScreen = connect(Screen, () => {
  const [ search, setSearch ] = useState('');
  const { name } = parseSearch(search);
  const stockQuery = useSearchStock({ search: name });
  const categoryQuery = useCategories();
  const [ create, submitting ] = useCreate();
  const onSubmit = useOnSubmit(search, setSearch, create);
  const viewItem = useViewItem();
  
  const onSearch = (v: string) => {
    if (!submitting) {
      setSearch(v);
    }
  };

  return {
    search,
    submitting,
    stockQuery,
    categoryQuery,
    onSubmit,
    onClick: viewItem,
    onSearch,
  };
});

export default ConnectedScreen;
