import Update from './Update';
import { Resource } from '@drongo/recess';
import { Stock } from 'domain/core';
import { useToggle } from 'ui/hooks';
import { usePreview } from './hooks';
import { wrap } from 'ui/hocs';

interface Props {
  submitting: boolean,
  resource: Resource<Stock>,
}

const ConnectedUpdate = wrap(Update, ({
  resource,
  submitting,
}: Props) => {
  const {
    unit: baseUnit,
    quantity: baseQuantity,
  } = resource.data;
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
