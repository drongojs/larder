import { useMutation, useQueryCache } from 'react-query';
import { useResolve } from 'react-jpex';
import {
  CreateStock,
  PatchStock,
  AddQuantity,
  DeleteStock,
} from 'core/stock';

export const useCreateStock = () => {
  const cache = useQueryCache();
  const fn = useResolve<CreateStock>();
  return useMutation(fn, {
    onSuccess() {
      cache.invalidateQueries('ingredient');
      cache.invalidateQueries('stock');
    },
  });
};

export const usePatchStock = () => {
  const cache = useQueryCache();
  const fn = useResolve<PatchStock>();
  return useMutation(fn, {
    onSuccess() {
      cache.invalidateQueries('stock');
    },
  });
};

export const useAddQuantity = () => {
  const cache = useQueryCache();
  const fn = useResolve<AddQuantity>();
  return useMutation(fn, {
    onSuccess() {
      cache.invalidateQueries('stock');
    },
  });
};

export const useDeleteStock = () => {
  const cache = useQueryCache();
  const fn = useResolve<DeleteStock>();
  return useMutation(fn, {
    onSuccess() {
      cache.invalidateQueries('stock');
    },
  });
};
