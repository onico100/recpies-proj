// src/stores/categoriesStore.ts
import { create } from 'zustand';

export type Category = {
  _id: string;
  category_name: string;
};

type CategoriesStore = {
  categories: Category[]; 
  setCategories: (categories: Category[]) => void; 
};

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }), 
}));


