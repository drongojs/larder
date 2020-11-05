import React from 'react';
import CategoryField, { Props as InnerProps } from './CategoryField';
import { enhance } from 'presentation/hocs';
import { useCreateCategory } from 'application/actions/categories';
import { useCategories } from 'application/queries/categories';
import { useFormikContext } from 'formik';

type OuterProps = Omit<InnerProps, 'categories' | 'onCreate'>

const ConnectedCategoryField = (props: OuterProps) => {
  const {
    setFieldValue,
  } = useFormikContext();
  const {
    data: categories,
  } = useCategories({ suspense: true });
  const [ createCategory ] = useCreateCategory();

  const onCreate = async(value: string) => {
    const category = await createCategory({ name: value });
    setFieldValue(props.name, category.id);
  };

  return (
    <CategoryField
      categories={categories}
      onCreate={onCreate}
      {...props}
    />
  );
};

export default enhance('ConnectedCategoryField')(ConnectedCategoryField);
