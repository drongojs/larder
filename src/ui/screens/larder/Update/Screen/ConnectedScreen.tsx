import { useUpdate } from 'adapters/commands/stock';
import { useStock } from 'adapters/queries/stock';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'ui/utils';
import Screen from './Screen';

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
