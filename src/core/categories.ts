export interface Category {
  id: string,
  name: string,
  icon: string,
}

export type FetchCategory = (args: { id: string }) => Promise<Category>;

export type FetchCategories = () => Promise<Category[]>;

export type CreateCategory = (args: {
  name: string,
  icon?: string,
}) => Promise<Category>;
