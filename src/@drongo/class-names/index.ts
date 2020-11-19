// if you try to get the keys of a union type (A | B) it will only return you the keys shared by both
// here we want to get all of the keys of both...
type KeysOfUnion<T> = T extends any ? keyof T: never;

interface StyleFormat {
  [name: string]: {
    [modifier: string]: string,
  },
}

export const makeGetClassNames = <T extends StyleFormat>(
  t: T,
) => {
  type Keys = keyof T;
  type Modifiers = {
    [K in KeysOfUnion<T[Keys]>]?: boolean
  };
  type Result = Record<Keys, string>;

  return (modifiers: Modifiers = {}): Result => {
    // @ts-ignore
    return Object
      .entries(t)
      .reduce((acc, [ name, styles ]) => {
        const classes = Object
          .entries(styles)
          .reduce((acc, [ key, styles ]) => {
            if (key === 'default' || modifiers[key]) {
              return [ ...acc, styles ];
            }
            return acc;
          }, []);

        return {
          ...acc,
          [name]: classes.join(' '),
        };
      }, {});
  };
};
