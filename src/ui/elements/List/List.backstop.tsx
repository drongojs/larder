import React from 'react';
import {
  List,
  ListHeader,
  ListItem,
} from './';
export { default } from './List.stories';

export const backstop = () => (
  <div>
    <div>
      <List>
        <ListHeader>Group 1</ListHeader>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListHeader>Group 2</ListHeader>
        <ListItem>Item 3</ListItem>
        <ListItem>Item 4</ListItem>
      </List>
    </div>
  </div>
);
