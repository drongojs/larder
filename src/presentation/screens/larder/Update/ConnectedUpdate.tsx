import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import Update from './Update';
import { useRegister } from 'react-jpex';
import larder from 'infrastructure/stock';
import ingredients from 'infrastructure/ingredients';
import categories from 'infrastructure/categories';
import { enhance } from 'presentation/hocs';

const ConnectedUpdate = () => {
  useRegister(larder, ingredients, categories);
  const history = useHistory();
  const onClose = useCallback(() => {
    history.push('/larder');
  }, [ history ]);

  return (<Update onClose={onClose}/>);
};

export default enhance('ConnectedUpdate')(ConnectedUpdate);
