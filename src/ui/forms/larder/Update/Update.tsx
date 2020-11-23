import React from 'react';
import { Form } from 'formik';
import AmountField from 'ui/modules/larder/update/AmountField';
import Buttons from 'ui/modules/larder/update/Buttons';
import Summary from 'ui/modules/larder/update/Summary';
import { Flex, Child } from 'ui/elements/Flex';

interface Props {
  negate: boolean,
  baseUnit: string,
  unit: string,
  quantity: number,
  submitting: boolean,
  onNegateClick: () => void,
}

const UpdateForm = ({
  negate,
  baseUnit,
  unit,
  submitting,
  quantity,
  onNegateClick,
}: Props) => {
  return (
    <Flex
      as={Form}
      direction="column"
      grow={true}
    >
      <Child>
        <AmountField
          baseUnit={baseUnit}
          submitting={submitting}
          negate={negate}
          quantity={quantity}
          unit={unit}
          onNegateClick={onNegateClick}
        />
        <Summary
          baseUnit={baseUnit}
          quantity={quantity}
        />
      </Child>
      <Buttons submitting={submitting}/>
    </Flex>
  );
};

export default UpdateForm;
