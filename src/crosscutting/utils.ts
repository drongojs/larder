interface Tuple {
  <A>(t: [ A ]): [ A ]
  <A, B>(t: [ A, B ]): [ A, B ]
  <A, B, C>(t: [ A, B, C ]): [ A, B, C ]
  <A, B, C, D>(t: [ A, B, C, D ]): [ A, B, C, D ]
  <A, B, C, D, E>(t: [ A, B, C, D, E ]): [ A, B, C, D, E ]
}
export const tuple = ((t: any[]) => t) as Tuple;

export const after = <T = any>(dt: number, value?: T) => new Promise<T>(res => {
  setTimeout(() => res(value), dt);
});

export const toPrecision = (value: number, precision: number) => {
  return Number(value.toFixed(precision));
};
