import { create } from "zustand";
import { Recipe } from "@/types/RecipeTypes";

export type RecipesStore = {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
};

export const useRecipesStore = create<RecipesStore>((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
}));
