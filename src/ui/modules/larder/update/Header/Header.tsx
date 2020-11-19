import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'linaria';
import Image from 'ui/elements/Image';
import theme from 'ui/theme';
import Color from 'color';
import { Resource } from '@drongo/recess';
import { Stock } from 'domain/core';

interface Props {
  resource: Resource<Stock>,
}

const styles = {
  root: css`
    position: relative;
  `,
  link: css`
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: ${theme.palette.white.color};
    background-color: ${Color(theme.palette.white.contrast).alpha(0.5).toString()};
    font-size: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    text-decoration: none;
    border-radius: ${theme.curvature}px;
  `,
};

const Header = ({
  resource: {
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
