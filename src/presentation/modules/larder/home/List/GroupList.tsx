import React, { useMemo } from 'react';
import { enhance } from 'presentation/hocs';
import { List as MuiList } from '@material-ui/core';
import { Stock } from 'core';
import { Filter } from 'core/larder';
import Group from './Group';

interface Props {
  stock: Stock[],
  filter: Filter,
}

const GroupList = (props: Props) => {
  const groups = useMemo(() => {
    const groups: {
      [key: string]: Stock[],
    } = {};

    props.stock.forEach((stock) => {
      if (!groups[stock.category]) {
        groups[stock.category] = [];
      }
      groups[stock.category].push(stock);
    });
    
    return groups;
  }, [ props.stock ]);

  return (
    <MuiList subheader={<li/>}>
      {Object.keys(groups).map((key) => (
        <Group
          key={key}
          id={key}
          stock={groups[key]}
          filter={props.filter}
        />
      ))}
    </MuiList>
  );
};

export default enhance('GroupList')(GroupList);
