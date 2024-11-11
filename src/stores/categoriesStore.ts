// src/stores/categoriesStore.ts
import { create } from 'zustand';
import { getAllCategories } from '@/services/categoriesService';

type Category = {
    _id: string;
  category_name: string;
};

type CategoriesStore = {
  categories: Category[];
  fetchCategories: () => Promise<void>;
};

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  fetchCategories: async () => {
    const categoriesData = await getAllCategories();
    set({ categories: categoriesData });
  },
}));
