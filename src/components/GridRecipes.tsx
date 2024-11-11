"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import styles from "@/styles/GridRecipes.module.css";
import { getAllRecipes } from "@/services/recipesService";
import RecipeDetails from "./RecipeDetails";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useRecipesStore } from "@/stores/recipesStore";
import { Recipe } from "@/stores/recipesStore";


type Category = {
  category_id: string;
};

export default function GridRecipes() {
  //const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Zustand categories store
  const { categories, fetchCategories } = useCategoriesStore();
  const { recipes, fetchRecipes } = useRecipesStore();

  useEffect(() => {
    setLoading(true); // התחלת טעינה
    fetchCategories();
    fetchRecipes();
    setLoading(false); 
  }, [fetchCategories , fetchRecipes]);

  const handleReadMoreClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    console.log(recipe.categoryId);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Find category name by ID
  const getCategoryNameById = (category_id:string) => {
    try{
      if (loading) {
        return "טוען קטגוריות...";
      }
      const category = categories.find((cat) => cat._id === category_id);
      return category ? category.category_name : "קטגוריה לא ידועה";
    } catch(err){
      console.error("Error: ", err);
      return "err";
  }
  };

  return (
    <div className={styles.grid}>
      {recipes?.map((recipe) => (
      // <p>"id: "{getCategoryNameById(recipe.categoryId)}</p>
        <RecipeCard
          key={recipe._id}
          url_image={recipe.url_image}
          recipe_name={recipe.recipe_name}
          category_name={getCategoryNameById(recipe.categoryId)}
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
            categoryName: getCategoryNameById(selectedRecipe.categoryId)
          }} // Pass category name to RecipeDetails
        />
      )}
    </div>
  );
}
