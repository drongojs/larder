import React, { useMemo } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Icon,
} from '@material-ui/core';
import {
  Link,
} from 'react-router-dom';
import Menu from './Menu';
import { Stock, Filter } from 'core/larder';
import { formatQuantity } from 'domain/selectors';
import { enhance } from 'presentation/hocs';

interface Props extends Omit<Stock, 'type'> {
  filter: Filter,
  onClear: () => any,
}

const Item = ({
  id,
  name,
  quantity,
  unit,
  category,
  filter,
  onClear,
}: Props) => {
  const icon = category?.icon ?? 'help';
  const amount = useMemo(() => formatQuantity(quantity, unit), [ quantity, unit ]);

  if (filter === 'empty' && quantity > 0) {
    return null;
  }
  if (filter === 'full' && quantity === 0) {
    return null;
  }

  return (
    <ListItem
      id={`stock_item_${id}`}
      to={`/larder/${id}`}
      button
      component={Link}
    >
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={name} secondary={amount}/>
      <ListItemSecondaryAction>
        <Menu id={id} onClear={onClear}/>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default enhance('Item')(Item);
