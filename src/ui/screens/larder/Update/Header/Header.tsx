import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'linaria';
import Image from 'ui/elements/Image';
import { palette, curvature, queries } from 'ui/theme';
import Color from 'color';
import { Query } from '@respite/query';
import { Stock } from 'domain/core';

interface Props {
  query: Query<Stock>,
}

const styles = {
  root: css`
    position: relative;
    margin-bottom: 2rem;

    ${queries.tabletUp} {
      width: 50%;
      margin-left: auto;
      margin-right: auto;
    }

    ${queries.desktopOnly} {
      width: 40%;
    }
  `,
  link: css`
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: ${palette.white.color};
    background-color: ${Color(palette.white.contrast).alpha(0.5).toString()};
    font-size: 1rem;
    text-decoration: none;
    border-radius: ${curvature}px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    ${queries.tabletUp} {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }

    &:hover {
      background-color: ${Color(palette.white.color).alpha(0.5).toString()};
    }
  `,
};

const Header = ({
  query: {
    data: {
      id,
      image,
    },
  },
}: Props) => (
  <div className={styles.root}>
    <Image src={image}/>
    <Link
      id="edit-stock-item"
      className={styles.link}
      to={`/larder/${id}/edit`}
    >
      <i className="fas fa-edit"/>
      {' '}
      <span>Edit</span>
    </Link>
  </div>
);

export default Header;
