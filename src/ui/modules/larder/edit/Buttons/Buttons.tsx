import React from 'react';
import { css } from 'linaria';
import Button from 'ui/elements/Button';
import { Kind } from 'ui/theme';
import { Link } from 'react-router-dom';

const styles = {
  root: css`
    display: flex;
    & > * {
      flex-basis: 100%;
    }
  `,
};

interface Props {
  id: string,
  submitting: boolean,
}

const Buttons = ({
  id,
  submitting,
}: Props) => {
  return (
    <div className={styles.root}>
      <Button
        type="submit"
        kind={Kind.CTA}
        pending={submitting}
      >
        Ok
      </Button>
      <Button
        kind={Kind.SECONDARY}
        pending={submitting}
        component={Link}
        to={`/larder/${id}`}
      >
        Cancel
      </Button>
    </div>
  );
};

export default Buttons;
