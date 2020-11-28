import { useParams, useHistory } from 'react-router';
import { useStock } from 'adapters/queries/stock';
import { useCategories } from 'adapters/queries/categories';
import { useUpdate } from 'adapters/actions/stock';
import { useCreate } from 'adapters/actions/categories';
import Edit from './Edit';
import { wrap } from 'ui/hocs';
import { parseSearch } from 'domain/selectors';

interface Values {
  amount: string,
  name: string,
  image: string,
  categoryId: string,
}

export default wrap(Edit, () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const stockQuery = useStock({ id });
  const categoryQuery = useCategories();
  const [ update, stockSubmitting ] = useUpdate([ stockQuery ]);
  const [ create, categorySubmitting ] = useCreate();

  const onCreateCategory = (name: string) => create({ name });

  const onSubmit = async(values: Values) => {
    const {
      amount,
      categoryId,
      image,
      name,
    } = values;
    const {
      quantity,
      unit,
    } = parseSearch(amount);
    await update({
      id,
      name,
      image,
      categoryId,
      quantity,
      unit,
    });
    history.push('/larder');
  };

  const submitting = stockSubmitting || categorySubmitting;

  return {
    categoryQuery,
    stockQuery,
    submitting,
    onCreateCategory,
    onSubmit,
  };
});
