import { useParams, useHistory } from 'react-router-dom';
import Screen from './Screen';
import { useStock } from 'adapters/queries/stock';
import { useUpdate } from 'adapters/actions/stock';
import { connect } from 'ui/utils';

const ConnectedScreen = connect(Screen, () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const query = useStock({ id });
  const [ update, submitting ] = useUpdate();
  
  const handleSubmit = async(values: any) => {
    await update({
      id,
      quantity: values.quantity,
    });
    history.push('/larder');
  };

  return {
    query,
    submitting,
    onSubmit: handleSubmit,
  };
});

export default ConnectedScreen;
