import React from 'react';
import {
  Autocomplete,
  createFilterOptions,
} from '@material-ui/lab';
import {
  TextField,
  Icon,
  InputAdornment,
} from '@material-ui/core';
import { Category } from 'domain/core';
import { enhance } from 'presentation/hocs';

const filter = createFilterOptions<Category>();

export interface Props {
  id?: string,
  name?: string,
  value: string,
  label: string,
  categories: Category[],
  onCreate: (v: string) => any,
  onChange: (evt: any) => any,
}

const CategoryField = ({
  id,
  name,
  label,
  value,
  categories,
  onChange,
  onCreate,
}: Props) => {
  const categoryValue = categories.find((c) => c.id === value) as Category;

  return (
    <Autocomplete
      value={categoryValue}
      onChange={(e, newValue: Category & { inputValue?: string }) => {
        if (typeof newValue === 'string') {
          onCreate(newValue);
        } else if (newValue?.inputValue != null) {
          onCreate(newValue.inputValue);
        } else {
          // change value
          onChange({
            target: {
              type: 'text',
              id,
              name,
              value: newValue?.id,
            },
          });
        }
      }}
      options={categories}
      getOptionLabel={(category: Category & { inputValue?: string }) => {
        if (typeof category === 'string') {
          return category;
        }
        if (category.inputValue != null) {
          return category.inputValue;
        }
        return category.name;
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
          filtered.push({
            id: null as any as string,
            // @ts-ignore
            inputValue: params.inputValue,
            name: `Add ${params.inputValue}`,
            icon: 'edit',
          });
        }

        return filtered;
      }}
      selectOnFocus={true}
      clearOnBlur={true}
      handleHomeEndKeys={true}
      renderOption={(category) => (
        <>
          <Icon>{category.icon}</Icon>
          <span
            style={{
              paddingLeft: 20,
            }}
          >{category.name}</span>
        </>
      )}
      fullWidth={true}
      freeSolo={true}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: categoryValue?.icon && (
              <InputAdornment position="start">
                <Icon>
                  {categoryValue?.icon}
                </Icon>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default enhance('CategoryField')(CategoryField);
