import React from 'react';
import { Form } from 'formik';
import AmountField from '../AmountField';
import Buttons from '../Buttons';
import Summary from '../Summary';
import { css } from 'linaria';
import { Kind, queries } from 'ui/theme';
import Notice from 'ui/elements/Notice';

interface Props {
  negate: boolean,
  baseUnit: string,
  unit: string,
  quantity: number,
  submitting: boolean,
  error: any,
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
  formError: css`
    margin-bottom: 1rem;
  `,
};

const UpdateForm = ({
  negate,
  baseUnit,
  unit,
  submitting,
  error,
  quantity,
  onNegateClick,
}: Props) => {
  return (
    <Form className={styles.root}>
      <If condition={error != null}>
        <Notice kind={Kind.DANGER} className={styles.formError}>
          {error.message}
        </Notice>
      </If>
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
