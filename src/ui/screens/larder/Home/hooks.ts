import {
  useState,
  useMemo,
} from 'react';
import { parseSearch } from 'domain/selectors';
import { useCreate } from 'adapters/actions/stock';
import { Resource } from '@drongo/recess';
import { Stock } from 'domain/core';
import { tuple } from 'crosscutting/utils';
import { useHistory } from 'react-router';

export const useOnClick = () => {
  const history = useHistory();
  return (id: string) => {
    history.push(`/larder/${id}`);
  };
};

export const useOnSubmit = (
  search: string,
  setSearch: (v: string) => void,
  stockResource: Resource<Stock[]>,
) => {
  const [ create, submitting ] = useCreate([ stockResource ]);

  const submit = async(e: any) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    const {
      name,
      quantity,
      unit,
    } = parseSearch(search);
    await create({
      name,
      quantity,
      unit,
    });
    setSearch(name);
  };

  return tuple([ submit, submitting ]);
};

export const useSearch = () => {
  const [ search, setSearch ] = useState('');

  const { name } = useMemo(() => {
    return parseSearch(search);
  }, [ search ]);

  return tuple([ search, setSearch, name ]);
};
