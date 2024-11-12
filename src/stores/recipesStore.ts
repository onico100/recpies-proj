import { create } from 'zustand';

export type Recipe = {
  _id: string;
  url_image: string;
  recipe_name: string;
  categoryId: string;
  instructions: string;
  ingredients: string[];
};

export type RecipesStore = {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
};

export const useRecipesStore = create<RecipesStore>((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes })
}));

