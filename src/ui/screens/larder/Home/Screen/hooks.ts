import { useCreate } from 'adapters/commands/stock';
import { parseSearch } from 'domain/selectors';
import { useHistory } from 'react-router-dom';

export const useViewItem = () => {
  const history = useHistory();
  return (id: string) => {
    history.push(`/larder/${id}`);
  };
};

export const useOnSubmit = (
  search: string,
  setSearch: (v: string) => void,
  create: ReturnType<typeof useCreate>[0],
) => {
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

  return submit;
};
