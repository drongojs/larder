export const after = <T = any>(dt: number, value?: T) => new Promise<T>((res) => {
  setTimeout(() => res(value), dt);
});
