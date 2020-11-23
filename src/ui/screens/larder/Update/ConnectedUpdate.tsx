import { useParams, useHistory } from 'react-router';
import UpdateScreen from './Update';
import { useStock } from 'adapters/queries/stock';
import { useUpdate } from 'adapters/actions/stock';
import { wrap } from 'ui/hocs';

const ConnectedUpdate = wrap(UpdateScreen, () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const resource = useStock({ id });
  const [ update, submitting ] = useUpdate();
  
  const handleSubmit = async(values: any) => {
    await update({
      id,
      quantity: values.quantity,
    });
    history.push('/larder');
  };

  return {
    resource,
    submitting,
    onSubmit: handleSubmit,
  };
});

export default ConnectedUpdate;
