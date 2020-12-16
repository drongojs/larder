import { useQuery } from '@drongo/respite';
import { Queries } from 'domain/constants';
import { ICategoryService } from 'ports/categories';
import { encase } from 'react-jpex';

const useCategories = (service: ICategoryService) => () => {
  return useQuery(service.readAll.bind(service), [ Queries.CATEGORIES ]);
};

export default encase(useCategories);
