import React, { useEffect } from 'react';
import { useField } from 'formik';
import TextInput, { Suffix } from 'ui/elements/TextInput';
import Button from 'ui/elements/Button';
import { Kind } from 'ui/theme';
import Label from 'ui/elements/Label';

interface Props {
  negate: boolean,
  baseUnit: string,
  unit: string,
  quantity: number,
  submitting: boolean,
  onNegateClick: () => void,
}

const AmountField = ({
  negate,
  baseUnit,
  unit,
  submitting,
  quantity,
  onNegateClick,
}: Props) => {
  const [ input ] = useField('amount');
  const [ qtyInput ] = useField('quantity');

  useEffect(() => {
    qtyInput.onChange({
      target: {
        name: 'quantity',
        value: quantity,
      },
    });
  }, [ quantity ]);

  const suffix = unit ? null : (
    <Suffix>{baseUnit}</Suffix>
  );
  const prefix = (
    <Button
      type="button"
      kind={negate ? Kind.DANGER : Kind.SUCCESS}
      onClick={() => onNegateClick()}
    >
      {negate ? '-' : '+'}
    </Button>
  );

  return (
    <Label>
      Amount
      <TextInput
        id="stock-amount-input"
        prefix={prefix}
        suffix={suffix}
        readOnly={submitting}
        {...input}
      />
    </Label>
  );
};

export default AmountField;
