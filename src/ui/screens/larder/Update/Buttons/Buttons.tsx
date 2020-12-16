import React from 'react';
import { css } from 'linaria';
import Button from 'ui/elements/Button';
import { Kind, queries } from 'ui/theme';
import { Link } from 'react-router-dom';

const styles = {
  root: css`
    display: flex;
    margin-bottom: 2rem;

    ${queries.tabletUp} {
      justify-content: space-around;
    }

    & > * {
      flex-basis: 100%;

      ${queries.tabletUp} {
        flex-basis: 25%;
      }
    }
  `,
};

interface Props {
  submitting: boolean,
}

const Buttons = ({
  submitting,
}: Props) => {
  return (
    <div className={styles.root}>
      <Button
        id="larder-update-submit"
        type="submit"
        kind={Kind.CTA}
        pending={submitting}
      >
        Ok
      </Button>
      <Button
        role="button"
        kind={Kind.SECONDARY}
        pending={submitting}
        component={Link}
        to="/larder"
      >
        Cancel
      </Button>
    </div>
  );
};

export default Buttons;
