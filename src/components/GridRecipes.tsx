"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import styles from "@/styles/GridRecipes.module.css";
import { getAllRecipes } from "@/services/recipesService";
import RecipeDetails from "./RecipeDetails";
import { useCategoriesStore } from "@/stores/categoriesStore";

type Recipe = {
  _id: string;
  url_image: string;
  recipe_name: string;
  category: { category_id: string, category_name: string };
  instructions: string;
  ingredients: string[];
};

export default function GridRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Zustand categories store
  const { categories, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    fetchCategories();
    const loadRecipes = async () => {
      try {
        const recipesData = await getAllRecipes();
        setRecipes(recipesData);
        console.log("grid recipes: ", recipesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "שגיאה לא ידועה");
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, [fetchCategories]);

  const handleReadMoreClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Find category name by ID
  const getCategoryNameById = (categoryId: string) => {
    console.log("category id: ", categoryId);
    const category = categories.find((cat) => cat.category_id === categoryId);
    return category ? category.category_name : "קטגוריה לא ידועה";
  };

  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          url_image={recipe.url_image}
          recipe_name={recipe.recipe_name}
          category_name= {recipe.category }
          instructions={recipe.instructions}
          onReadMore={() => handleReadMoreClick(recipe)}
        />
      ))}

      {/* Sidebar for Recipe Details */}
      {selectedRecipe && (
        <RecipeDetails
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
          recipe={{
            ...selectedRecipe,
            categoryName: getCategoryNameById(selectedRecipe.category.category_name),
          }} // Pass category name to RecipeDetails
        />
      )}
    </div>
  );
}
