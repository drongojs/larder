import React, { useMemo } from 'react';
import { useField } from 'formik';
import Select from 'ui/elements/Select';
import { Category } from 'domain/core';
import Label from 'ui/elements/Label';
import { Query } from '@drongo/respite';

interface Props {
  query: Query<Category[]>,
  onCreate: (name: string) => any,
}

const CategoryField = ({
  query: {
    data: categories,
  },
  onCreate,
}: Props) => {
  const [ input, , { setValue } ] = useField('categoryId');

  const options = useMemo(() => {
    return categories.map(category => category.id);
  }, [ categories ]);

  const categoryMap = useMemo(() => {
    return categories.reduce((acc, category) => {
      return {
        ...acc,
        [category.id]: category,
      };
    }, {} as { [key: string]: Category });
  }, [ categories ]);

  return (
    <div>
      <Label>
        Category
        <Select
          options={options}
          getKey={(id: string) => id}
          getText={(id: string) => categoryMap[id]?.name}
          {...input}
          onChange={setValue}
          onAdd={async name => {
            const category = await onCreate(name);
            return category.id;
          }}
        />
      </Label>
    </div>
  );
};

export default CategoryField;
