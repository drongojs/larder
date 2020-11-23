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
  const stockResource = useStock({ id });
  const categoryResource = useCategories();
  const [ update, stockSubmitting ] = useUpdate([ stockResource, categoryResource ]);
  const [ create, categorySubmitting ] = useCreate([ categoryResource ]);

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
    categoryResource,
    stockResource,
    submitting,
    onCreateCategory,
    onSubmit,
  };
});
