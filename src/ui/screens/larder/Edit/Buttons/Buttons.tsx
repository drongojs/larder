import React from 'react';
import { css } from 'linaria';
import Button from 'ui/elements/Button';
import { Kind, queries } from 'ui/theme';
import { Link } from 'react-router-dom';
import { Query } from '@drongo/respite';
import { Stock } from 'domain/core';

const styles = {
  root: css`
    display: flex;

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
  stockQuery: Query<Stock>,
  submitting: boolean,
}

const Buttons = ({
  stockQuery: {
    data: {
      id,
    },
  },
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
