/* eslint-disable no-param-reassign */
import convert from 'convert-units';
import { useRouteMatch } from 'react-router-dom';
import { toPrecision } from 'crosscutting/utils';

export const useId = () => {
  const { params: { id }  } = useRouteMatch<{ id: string }>();
  return id;
};


const allUnits: string[] = convert().possibilities();

export const formatQuantity = (quantity: number, fromUnit?: string, toUnit?: string) => {
  if (!fromUnit) {
    return `${quantity}`;
  }
  if (quantity === 0) {
    return `${quantity}${toUnit || fromUnit}`;
  }
  if (!toUnit) {
    const {
      unit: outUnit,
      val,
    } = convert(quantity).from(fromUnit as any).toBest();
    return `${toPrecision(val, 2)}${outUnit}`;
  }
  if (fromUnit === toUnit) {
    return `${quantity}${fromUnit}`;
  }
  const val = convert(quantity).from(fromUnit as any).to(toUnit as any);
  return `${toPrecision(val, 2)}${toUnit}`;
};

type ParsedSearch = {
  search: string,
  name: string,
  quantity: number,
  unit: string,
};
export const parseSearch = (search: string): ParsedSearch => {
  const result = { search } as ParsedSearch;
  const match = search.match(/^(.*? ?)(-?(?:[\d./])+)([a-zA-Z]*)( ?.*)$/);
  if (match == null) {
    result.name = search;
    return result;
  }
  if (match[1] || match[4]) {
    result.name = `${match[1]}${match[4]}`.trim();
  }
  if (match[2]) {
    const arr = match[2].split('/');
    const quantity = Number(arr[0]) / Number(arr[1] ?? 1);
    result.quantity = quantity;
  }
  if (match[3] && allUnits.includes(match[3])) {
    result.unit = match[3];
  }
  return result;
};
