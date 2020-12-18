import { useAction } from '@respite/action';
import { Queries } from 'domain/constants';
import { ICategoryService } from 'ports/categories';
import { encase } from 'react-jpex';

const useCreate = (service: ICategoryService) => () => {
  return useAction(service.create.bind(service), Queries.CATEGORIES);
};

export default encase(useCreate);
