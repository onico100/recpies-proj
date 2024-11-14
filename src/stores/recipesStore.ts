import { create } from "zustand";
import { Recipe } from "@/types/RecipeTypes";
import { persist } from "zustand/middleware";

export type RecipesStore = {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
};

export const useRecipesStore = create<RecipesStore>()(
  persist(
    (set) => ({
      recipes: [],
      setRecipes: (recipes) => set({ recipes }),
    }),
    {
      name: "recipes-storage", // Specify a storage name (optional)
    }
  )
);

console.log("recipes store created");
