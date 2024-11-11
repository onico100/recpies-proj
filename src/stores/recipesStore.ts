// src/stores/recipesStore.ts
import { create } from 'zustand';
import {getAllRecipes} from '@/services/recipesService';

export type Recipe = {
    _id: string;
    url_image: string;
    recipe_name: string;
    categoryId: string;
    instructions: string;
    ingredients: string[];
  };

  type RecipesStore = {
    recipes: Recipe[];
    fetchRecipes: () => Promise<void>;
  };

  export const useRecipesStore= create<RecipesStore>((set) => ({
    recipes: [],
    fetchRecipes: async () => {
      const recipesData = await getAllRecipes();
      set({ recipes: recipesData });
      console.log("store: ", recipesData);
    },
  }));