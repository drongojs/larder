import React from 'react';
import { css } from 'linaria';
import {
  List,
  ListItem,
  ListHeader,
} from '..';
import Image from '../../Image';

export default {
  title: 'elements/List',
};

export const Basic = () => (
  <div>
    <List>
      <ListItem>
        This is a list item
      </ListItem>
      <ListItem>
        Item 2
      </ListItem>
      <ListItem>
        Item 3
      </ListItem>
      <ListItem>
        Item 4
      </ListItem>
    </List>
  </div>
);

export const Grouped = () => (
  <div>
    <List>
      <ListHeader>Group 1</ListHeader>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
      <ListHeader>Group 2</ListHeader>
      <ListItem>Item 4</ListItem>
      <ListItem>Item 5</ListItem>
    </List>
  </div>
);

const exampleStyles = {
  content: css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    justify-content: center;
  `,
};

export const Example = () => (
  <div>
    <List>
      <ListHeader>Frozen</ListHeader>
      <ListItem>
        <Image
          src="http://lorempixel.com/100/100/food/1"
          width={100}
          height={100}
        />
        <div className={exampleStyles.content}>
          <div>Peas</div>
          <div>500g</div>
        </div>
      </ListItem>
    </List>
  </div>
);
