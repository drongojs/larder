export interface Ingredient {
  id: string,
  category: string,
  name: string,
  unit?: string,
}

export type FetchIngredient = (args: { id: string }) => Promise<Ingredient>;
