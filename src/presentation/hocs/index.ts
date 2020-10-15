import { FunctionComponent } from 'react';

export const enhance = (name: string) => <P>(C: FunctionComponent<P>) => {
  // eslint-disable-next-line no-param-reassign
  C.displayName = name;
  return C;
};
