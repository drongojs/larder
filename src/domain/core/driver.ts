export type Driver = <T = unknown>(args: {
  url: string,
  method?: string,
  data?: object,
  params?: object,
}) => Promise<T>;
