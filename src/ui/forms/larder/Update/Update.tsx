import React from 'react';
import { css } from 'linaria';
import { Form } from 'formik';
import AmountField from 'ui/modules/larder/update/AmountField';
import Buttons from 'ui/modules/larder/update/Buttons';
import Summary from 'ui/modules/larder/update/Summary';

const styles = {
  root: css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  `,
  form: css`
    flex-grow: 1;
  `,
};

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
    <Form className={styles.root}>
      <div className={styles.form}>
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
      </div>
      <Buttons submitting={submitting}/>
    </Form>
  );
};

export default UpdateForm;
