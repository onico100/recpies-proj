import { create } from "zustand";
import { Category } from "@/types/CategogyTypes";
import { persist } from "zustand/middleware";

type CategoriesStore = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

export const useCategoriesStore = create<CategoriesStore>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
    }),
    {
      name: "categories-storage", // Specify a storage name (optional)
    }
  )
);
