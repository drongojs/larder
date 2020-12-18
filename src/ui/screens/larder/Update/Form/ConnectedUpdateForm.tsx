import Update from './UpdateForm';
import { Query } from '@respite/query';
import { Stock } from 'domain/core';
import { usePreview } from 'domain/selectors/larder/update';
import { connect, useToggle } from 'ui/utils';

interface Props {
  submitting: boolean,
  query: Query<Stock>,
  error: any,
}

const ConnectedUpdateForm = connect(Update, ({
  query,
  submitting,
  error,
}: Props) => {
  const {
    unit: baseUnit,
    quantity: baseQuantity,
  } = query.data;
  const [ negate, toggleNegate ] = useToggle();
  const {
    quantity,
    unit,
  } = usePreview(baseQuantity, baseUnit, negate);

  return {
    error,
    submitting,
    quantity,
    baseUnit,
    unit,
    negate,
    onNegateClick: toggleNegate,
  };
});

export default ConnectedUpdateForm;
