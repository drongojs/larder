export type Driver = <T>(args: {
  url: string,
  method?: string,
  data?: object,
  params?: object,
}) => Promise<T>;
