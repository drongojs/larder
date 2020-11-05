import { useMutation, useQueryCache } from 'react-query';
import { useResolve } from 'react-jpex';
import { INGREDIENT, SEARCH_STOCK, STOCK } from 'domain/constants/queries';
import { Driver } from 'core/driver';
import { StockType } from 'domain/constants';
import { useStock } from 'application/queries/stock';
import { useIngredient } from 'application/queries/ingredients';
import convert from 'convert-units';

export const useCreateStock = () => {
  const cache = useQueryCache();
  const driver = useResolve<Driver>();
  const fn = ({
    type,
    ...data
  }: {
    type: StockType,
    name: string,
    quantity: number,
    unit: string,
  }) => driver({
    url: '/api/stock/:type/items',
    params: { type },
    method: 'POST',
    data,
  });

  return useMutation(fn, {
    onSuccess() {
      cache.invalidateQueries(INGREDIENT);
      cache.invalidateQueries(SEARCH_STOCK);
    },
  });
};

export const usePatchStock = () => {
  const cache = useQueryCache();
  const driver = useResolve<Driver>();
  const fn = ({
    type,
    id,
    ...data
  }: {
    type: StockType,
    id: string,
    category?: string,
    quantity?: number,
    name?: string,
    unit?: string,
  }) => driver({
    url: '/api/stock/:type/item/:id',
    params: { type, id },
    method: 'PATCH',
    data,
  });

  return useMutation(fn, {
    onSuccess({ type, id }) {
      cache.invalidateQueries(SEARCH_STOCK);
      cache.invalidateQueries([ STOCK, { type, id } ]);
      cache.invalidateQueries([ INGREDIENT, id ]);
    },
  });
};

export const useAddQuantity = ({
  type,
  id,
}: {
  type: StockType,
  id: string,
}) => {
  const cache = useQueryCache();
  const [ patch ] = usePatchStock();
  const { data: item } = useStock({ type, id });
  const { data: ingredient } = useIngredient({ id });

  const fn = (args: {
    quantity: number,
    unit?: string,
  }) => {
    let { quantity = 1, unit } = args;

    if (!unit) {
      unit = ingredient.unit;
    }

    if (unit !== ingredient.unit) {
      quantity = convert(quantity).from(unit as any).to(ingredient.unit as any);
    }

    quantity += item.quantity;

    return patch({
      id,
      type,
      quantity,
    });
  };

  return useMutation(fn, {
    onSuccess({ type, id }) {
      cache.invalidateQueries(SEARCH_STOCK);
      cache.invalidateQueries([ STOCK, { type, id } ]);
    },
  });
};

export const useDeleteStock = () => {
  const cache = useQueryCache();
  const driver = useResolve<Driver>();

  const fn = ({
    type,
    id,
  }: {
    type: StockType,
    id: string,
  }) => driver({
    url: '/api/stock/:type/item/:id',
    params: { type, id },
    method: 'DELETE',
  });

  return useMutation(fn, {
    onSuccess() {
      cache.invalidateQueries(SEARCH_STOCK);
    },
  });
};
