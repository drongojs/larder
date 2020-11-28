import Home from './Home';
import { useSearchStock } from 'adapters/queries/stock';
import { useCategories } from 'adapters/queries/categories';
import {
  useOnClick,
  useOnSubmit,
  useSearch,
} from 'domain/selectors/larder/home';
import { wrap } from 'ui/hocs';

const ConnectedHome = wrap(Home, () => {
  const [ search, setSearch, name ] = useSearch();
  
  const stockQuery = useSearchStock({ search: name });
  const categoryQuery = useCategories();

  const [ onSubmit, submitting ] = useOnSubmit(search, setSearch);

  const onClick = useOnClick();
  
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
    onClick,
    onSearch,
  };
});

export default ConnectedHome;
