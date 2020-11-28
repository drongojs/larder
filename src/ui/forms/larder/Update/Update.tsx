import React from 'react';
import { Form } from 'formik';
import AmountField from 'ui/modules/larder/update/AmountField';
import Buttons from 'ui/modules/larder/update/Buttons';
import Summary from 'ui/modules/larder/update/Summary';
import { Flex, Child } from 'ui/elements/Flex';
import { css } from 'linaria';
import { tabletLandscapeUp, desktopUp } from 'ui/theme';

interface Props {
  negate: boolean,
  baseUnit: string,
  unit: string,
  quantity: number,
  submitting: boolean,
  onNegateClick: () => void,
}

const styles = {
  fields: css`
    ${tabletLandscapeUp()} {
      display: flex;
      justify-content: space-between;

      & > *:first-child {
        flex-basis: 75%;
      }
    }
    ${desktopUp()} {
      width: 50%;
      margin: auto;
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
    <Flex
      as={Form}
      direction="column"
      grow={true}
    >
      <Child>
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
      </Child>
      <Buttons submitting={submitting}/>
    </Flex>
  );
};

export default UpdateForm;
