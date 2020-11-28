import Update from './Update';
import { Query } from '@drongo/respite';
import { Stock } from 'domain/core';
import { useToggle } from 'ui/hooks';
import { usePreview } from 'domain/selectors/larder/update';
import { wrap } from 'ui/hocs';

interface Props {
  submitting: boolean,
  query: Query<Stock>,
}

const ConnectedUpdate = wrap(Update, ({
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

export default ConnectedUpdate;
