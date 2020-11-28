import React from 'react';
import { css } from 'linaria';
import Button from 'ui/elements/Button';
import { Kind, tabletLandscapeUp } from 'ui/theme';
import { Link } from 'react-router-dom';

const styles = {
  root: css`
    display: flex;

    ${tabletLandscapeUp()} {
      justify-content: flex-end;
    }

    & > * {
      flex-basis: 100%;

      ${tabletLandscapeUp()} {
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
