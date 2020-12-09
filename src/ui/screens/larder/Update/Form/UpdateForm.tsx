import React from 'react';
import { Form } from 'formik';
import AmountField from '../AmountField';
import Buttons from '../Buttons';
import Summary from '../Summary';
import { css } from 'linaria';
import { queries } from 'ui/theme';

interface Props {
  negate: boolean,
  baseUnit: string,
  unit: string,
  quantity: number,
  submitting: boolean,
  onNegateClick: () => void,
}

const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    ${queries.desktopOnly} {
      width: 60%;
      margin-left: 1rem;
    }
  `,
  fields: css`
    flex-grow: 1;
    ${queries.tabletOnly} {
      margin-bottom: 8rem;
    }
  `,
};

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
      <div className={styles.fields}>
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
