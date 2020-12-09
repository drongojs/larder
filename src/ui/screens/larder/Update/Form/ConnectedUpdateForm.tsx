import Update from './UpdateForm';
import { Query } from '@drongo/respite';
import { Stock } from 'domain/core';
import { usePreview } from 'domain/selectors/larder/update';
import { connect, useToggle } from 'ui/utils';

interface Props {
  submitting: boolean,
  query: Query<Stock>,
}

const ConnectedUpdateForm = connect(Update, ({
  query,
  submitting,
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
    submitting,
    quantity,
    baseUnit,
    unit,
    negate,
    onNegateClick: toggleNegate,
  };
});

export default ConnectedUpdateForm;
