import React, { useMemo } from 'react';
import { Query } from '@drongo/respite';
import { Stock, Category } from 'domain/core';
import { List } from 'ui/elements/List';
import Empty from './Empty';
import { css } from 'linaria';
import { Spinner } from 'ui/elements/Progress';
import { Flex } from 'ui/elements/Flex';
import CategoryWithStock from './CategoryWithStock';
import Items from './Items';

interface Props {
  onClick: (id: string) => void,
  stockQuery: Query<Stock[]>,
  categoryQuery: Query<Category[]>,
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
    pointer-events: none;
  `,
};

const InlineLoader = ({ isFetching }: { isFetching: boolean }) => {
  if (!isFetching) {
    return null;
  }
  return (
    <Flex justify="center" align="center" className={styles.loading}>
      <Spinner/>
    </Flex>
  );
};

const StockList = ({
  stockQuery,
  categoryQuery,
  onClick,
}: Props) => {
  const { data: stock, isFetching } = stockQuery;

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

  return (
    <div className={styles.root}>
      <InlineLoader isFetching={isFetching}/>
      <List style={{ position: 'relative' }}>
        <Choose>
          <When condition={categories.length === 0}>
            <Empty/>
          </When>
          <When condition={categories.length === 1}>
            <Items
              stock={stock}
              onClick={onClick}
            />
          </When>
          <Otherwise>
            {categories.map(([ categoryId, stock ]) => (
              <CategoryWithStock
                key={categoryId}
                id={categoryId}
                query={categoryQuery}
                stock={stock}
                onClick={onClick}
              />
            ))}
          </Otherwise>
        </Choose>
      </List>
    </div>
  );
};

export default StockList;
