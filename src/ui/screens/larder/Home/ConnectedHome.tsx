import Home from './Home';
import { useSearchStock } from 'adapters/queries/stock';
import { useCategories } from 'adapters/queries/categories';
import {
  useOnClick,
  useOnSubmit,
  useSearch,
} from './hooks';
import { wrap } from 'ui/hocs';

const ConnectedHome = wrap(Home, () => {
  const [ search, setSearch, name ] = useSearch();
  
  const stockResource = useSearchStock({ search: name });
  const categoryResource = useCategories();

  const [ onSubmit, submitting ] = useOnSubmit(search, setSearch, stockResource);

  const onClick = useOnClick();
  
  const onSearch = (v: string) => {
    if (!submitting) {
      setSearch(v);
    }
  };

  return {
    search,
    submitting,
    stockResource,
    categoryResource,
    onSubmit,
    onClick,
    onSearch,
  };
});

export default ConnectedHome;
