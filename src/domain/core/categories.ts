export interface Category {
  id: string,
  name: string,
}

export type Read = () => Promise<Category[]>;

export type Create = (args: Partial<Omit<Category, 'id'>>) => Promise<Category>;

export type Update = (args: Partial<Category> & Pick<Category, 'id'>) => Promise<Category>;

export type Delete = (args: { id: string }) => Promise<void>;
