export interface Stock {
  id: string,
  categoryId: string,
  name: string,
  image: string,
  unit?: string,
  quantity: number,
}

export type Search = (args: { search: string }) => Promise<Stock[]>;

export type Read = (args: { id: string }) => Promise<Stock>;

export type Create = (args: Partial<Omit<Stock, 'id'>>) => Promise<Stock>;

export type Update = (args: Partial<Stock> & Pick<Stock, 'id'>) => Promise<Stock>;

export type Delete = (args: { id: string }) => Promise<void>;
