import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  Skeleton,
} from '@material-ui/lab';
import { enhance } from 'presentation/hocs';

const ItemPending = () => (
  <ListItem>
    <ListItemIcon>
      <Skeleton
        animation="wave"
        variant="circle"
        width={40}
        height={40}
      />
    </ListItemIcon>
    <ListItemText
      primary={(
        <Skeleton
          animation="wave"
          width="25%"
          height={40}
        />
      )}
    />
    <ListItemSecondaryAction>
      <Skeleton
        animation="wave"
        width={30}
        height={40}
      />
    </ListItemSecondaryAction>
  </ListItem>
);

export default enhance('ItemPending')(ItemPending);
