import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import Update from './Update';
import { enhance } from 'presentation/hocs';

const ConnectedUpdate = () => {
  const history = useHistory();
  const onClose = useCallback(() => {
    history.push('/larder');
  }, [ history ]);

  return (<Update onClose={onClose}/>);
};

export default enhance('ConnectedUpdate')(ConnectedUpdate);
