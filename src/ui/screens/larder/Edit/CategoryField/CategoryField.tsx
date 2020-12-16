import React, { useMemo } from 'react';
import { useField } from 'formik';
import { Select, AddOption, Option } from 'ui/elements/Select';
import { Category } from 'domain/core';
import Label from 'ui/elements/Label';
import { Query } from '@drongo/respite';

interface Props {
  query: Query<Category[]>,
  onCreate: (name: string) => Promise<Category>,
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
      <Label htmlFor="stock-edit-category">
        Category
      </Label>
      <Select
        id="stock-edit-category"
        getText={id => categoryMap[id]?.name || ''}
        {...input}
        value={input.value}
        onChange={setValue}
      >
        {options.map(id => (
          <Option
            key={id}
            value={id}
            search={categoryMap[id]?.name.toLowerCase()}
          >
            {categoryMap[id]?.name}
          </Option>
        ))}
        <AddOption
          render={str => `create ${str}`}
          onClick={async name => {
            const category = await onCreate(name);
            setValue(category.id);
          }}
        />
      </Select>
    </div>
  );
};

export default CategoryField;
