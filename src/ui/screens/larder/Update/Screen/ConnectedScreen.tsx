import { Status } from '@respite/core';
import { useUpdate } from 'adapters/commands/stock';
import { useStock } from 'adapters/queries/stock';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'ui/utils';
import Screen from './Screen';

const ConnectedScreen = connect(Screen, () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const query = useStock({ id });
  const {
    action: update,
    error,
    submitting,
  } = useUpdate([ query ]);
  
  const handleSubmit = async(values: any) => {
    try {
      await update({
        id,
        quantity: values.quantity,
      });
      history.push('/larder');
    } catch (e) {
      // 
    }
  };

  return {
    query,
    submitting,
    error,
    onSubmit: handleSubmit,
  };
});

export default ConnectedScreen;
