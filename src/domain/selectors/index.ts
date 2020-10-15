/* eslint-disable no-param-reassign */
import convert from 'convert-units';
import { useRouteMatch } from 'react-router';

export const useId = () => {
  const { params: { id }  } = useRouteMatch<{ id: string }>();
  return id;
};


const allUnits: string[] = convert().possibilities();

export const formatQuantity = (quantity: number, fromUnit?: string, toUnit?: string) => {
  if (fromUnit == null) {
    return `${quantity}`;
  }
  if (toUnit == null) {
    const {
      unit: outUnit,
      val,
    } = convert(quantity).from(fromUnit as any).toBest();
    return `${val}${outUnit}`;
  }
  if (fromUnit === toUnit) {
    return `${quantity}${fromUnit}`;
  }
  const val = convert(quantity).from(fromUnit as any).to(toUnit as any);
  return `${val}${toUnit}`;
};

type ParsedSearch = {
  search: string,
  name: string,
  quantity: number,
  unit: string,
};
export const parseSearch = (search: string): ParsedSearch => {
  return search
    .split(' ')
    .reduce((acc, part) => {
      if (acc.unit == null && allUnits.includes(part)) {
        acc.unit = part;
        return acc;
      }
      const match = part.match(/^(-?\d+)(.*)$/i);
      if (match == null) {
        acc.name = `${acc.name || ''} ${part}`.trim();
        return acc;
      }
      if (match[2] && !allUnits.includes(match[2])) {
        acc.name = `${acc.name || ''} ${part}`.trim();
        return acc;
      }
      
      if (acc.quantity == null) {
        acc.quantity = Number(match[1]);
      }
      if (match[2] && acc.unit == null && allUnits.includes(match[2])) {
        acc.unit = match[2];
      }
      return acc;
    }, { search } as ParsedSearch);
};
