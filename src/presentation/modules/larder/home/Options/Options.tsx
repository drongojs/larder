import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Filter } from 'domain/core/larder';

const GroupItem = ({
  grouped,
  toggleGrouped,
}: {
  grouped: boolean,
  toggleGrouped: () => void,
}) => {
  return (
    <ListItem button>
      <ListItemText primary="Group by category"/>
      <ListItemSecondaryAction>
        <Switch
          checked={grouped}
          onChange={toggleGrouped}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
const FilterItem = ({
  filter,
  setFilter,
}: {
  filter: Filter,
  setFilter: (v: Filter) => void,
}) => {
  return (
    <ListItem button>
      <ListItemText primary="Filter"/>
      <ListItemSecondaryAction>
        <Select
          value={filter}
          onChange={(evt: any) => setFilter(evt.target.value)}
        >
          <MenuItem value="everything">
            Everything
          </MenuItem>
          <MenuItem value="full">
            Only in stock
          </MenuItem>
          <MenuItem value="empty">
            Only empty
          </MenuItem>
        </Select>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const options = ({
  grouped,
  toggleGrouped,
  filter,
  setFilter,
}: {
  grouped: boolean,
  toggleGrouped: () => void,
  filter: Filter,
  setFilter: (v: Filter) => void,
}) => {
  return (
    <List>
      <GroupItem
        grouped={grouped}
        toggleGrouped={toggleGrouped}
      />
      <FilterItem
        filter={filter}
        setFilter={setFilter}
      />
    </List>
  );
};

export default options;
