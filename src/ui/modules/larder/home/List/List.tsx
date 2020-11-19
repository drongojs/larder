import React, { useMemo } from 'react';
import { Resource } from '@drongo/recess';
import { Stock, Category } from 'domain/core';
import { List } from 'ui/elements/List';
import Empty from './Empty';
import { css } from 'linaria';
import { Spinner } from 'ui/elements/Progress';
import CategoryWithStock from './CategoryWithStock';
import Items from './Items';

interface Props {
  onClick: (id: string) => void,
  stockResource: Resource<Stock[]>,
  categoryResource: Resource<Category[]>,
}

const styles = {
  root: css`
    position: relative;
  `,
  loading: css`
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  `,
};

const InlineLoader = ({ isFetching }: { isFetching: boolean }) => {
  if (!isFetching) {
    return null;
  }
  return (
    <div className={styles.loading}>
      <Spinner/>
    </div>
  );
};

const StockList = ({
  stockResource,
  categoryResource,
  onClick,
}: Props) => {
  const { data: stock, isFetching } = stockResource;

  // TODO: maybe extract this logic
  const categories = useMemo(() => {
    const categories: { [key: string]: Stock[] } = stock.reduce((acc, stock) => {
      const key = stock.categoryId ?? '';

      return {
        ...acc,
        [key]: [
          ...acc[key] ?? [],
          stock,
        ],
      };
    }, {});

    return Object.entries(categories);
  }, [ stock ]);

  let content: any = null;

  if (categories.length === 0) {
    content = (<Empty/>);
  } else if (categories.length === 1) {
    content = (
      <Items
        stock={stock}
        onClick={onClick}
      />
    );
  } else {
    content = categories.map(([ categoryId, stock ]) => (
      <CategoryWithStock
        key={categoryId}
        id={categoryId}
        resource={categoryResource}
        stock={stock}
        onClick={onClick}
      />
    ));
  }

  return (
    <div className={styles.root}>
      <InlineLoader isFetching={isFetching}/>
      <List style={{ position: 'relative' }}>
        {content}
      </List>
    </div>
  );
};

export default StockList;
