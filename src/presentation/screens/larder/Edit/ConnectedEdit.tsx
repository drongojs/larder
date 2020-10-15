import React from 'react';
import Edit from './Edit';
import { useRegister } from 'react-jpex';
import larder from 'infrastructure/stock';
import ingredients from 'infrastructure/ingredients';
import categories from 'infrastructure/categories';
import { enhance } from 'presentation/hocs';

const ConnectedEdit = () => {
  useRegister(larder, ingredients, categories);

  return (<Edit/>);
};

export default enhance('ConnectedEdit')(ConnectedEdit);
