import { useFormikContext } from 'formik';
import { useMemo } from 'react';
import { parseSearch, formatQuantity } from 'domain/selectors';

export const usePreview = (
  baseQuantity: number,
  baseUnit: string,
  negate: boolean,
) => {
  const { values: { amount: userAmount } } = useFormikContext();

  return useMemo(() => {
    const { unit, quantity: rawAdjustment } = parseSearch(userAmount);
    const convertedAdjustment = formatQuantity(rawAdjustment, unit || baseUnit, baseUnit);
    let adjustment = parseSearch(convertedAdjustment).quantity || 0;
    if (negate) {
      adjustment = 0 - adjustment;
    }
    const quantity = baseQuantity + adjustment;

    return {
      quantity,
      unit,
    };
  }, [ userAmount, baseUnit, baseQuantity, negate ]);
};
