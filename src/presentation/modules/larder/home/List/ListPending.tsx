import React from 'react';
import {
  List,
  ListItem,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { enhance } from 'presentation/hocs';

const ListPending = () => (
  <List>
    <ListItem>
      <Box mx="auto">
        <CircularProgress/>
      </Box>
    </ListItem>
  </List>
);

export default enhance('ListPending')(ListPending);
