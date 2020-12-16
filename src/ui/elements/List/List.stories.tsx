import React from 'react';
import { css } from 'linaria';
import {
  List,
  ListItem,
  ListHeader,
} from './';
import Image from '../Image';

export default {
  title: 'elements/List',
};

export const basic = ({
  count,
  groups,
}: {
  count: number,
  groups: number,
}) => {
  const items = Array(groups)
    .fill(null)
    .map(() => {
      return Array(count)
        .fill(null)
        .map((v, i) => `Item ${i}`);
    });

  return (
    <div>
      <List>
        {items.reduce((acc, group, i) => {
          const header = (
            <ListHeader>
              {`Group ${i}`}
            </ListHeader>
          );
          const items = group.map(item => (
            <ListItem key={item}>
              {item}
            </ListItem>
          ));

          return acc.concat(header).concat(items);
        }, [] as JSX.Element[])}
      </List>
    </div>
  );
};
basic.args = {
  count: 1,
  groups: 1,
};

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
          src="https://picsum.photos/id/488/300/300"
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
