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
        Save
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
