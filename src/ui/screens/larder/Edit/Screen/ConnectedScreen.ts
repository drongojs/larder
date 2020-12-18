import { useCreate as useCreateCategory } from 'adapters/commands/categories';
import { useUpdate as useUpdateStock } from 'adapters/commands/stock';
import { useCategories } from 'adapters/queries/categories';
import { useStock } from 'adapters/queries/stock';
import { parseSearch } from 'domain/selectors';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'ui/utils';
import Screen from './Screen';

interface Values {
  amount: string,
  name: string,
  image: string,
  categoryId: string,
}

export default connect(Screen, () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const stockQuery = useStock({ id });
  const categoryQuery = useCategories();
  const {
    action: update,
    submitting: stockSubmitting,
  } = useUpdateStock([ stockQuery ]);
  const {
    action: create,
    submitting: categorySubmitting,
  } = useCreateCategory();

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
