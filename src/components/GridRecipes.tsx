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
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]); 


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
  const handleToggleFavorite = (recipeId: string) => {
    setFavoriteRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const isRecipeFavorite = (recipeId: string) => favoriteRecipes.includes(recipeId);

  // Find category name by ID
  const getCategoryNameById = (category_id:string) => {
    try{
      if (loading) {
        return "Loading categorys..."
      }
      console.log("category id: ", category_id);
      console.log("categories: ", categories);
      const category = categories.find((cat) => cat._id === category_id);
      console.log("category found: ", category);
      return category ? category.category_name : "Unknown ";
    } catch(err){
      console.error("Error: ", err);
      return "err";
  }
  };

  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
      // <p>"id: "{getCategoryNameById(recipe.categoryId)}</p>
        <RecipeCard
          key={recipe._id}
          url_image={recipe.url_image}
          recipe_name={recipe.recipe_name}
          category_name={getCategoryNameById(recipe.categoryId)}
          instructions={recipe.instructions}
          isFavorite={isRecipeFavorite(recipe._id)} 
          onToggleFavorite={() => handleToggleFavorite(recipe._id)} 
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
          isFavorite={isRecipeFavorite(selectedRecipe._id)} 
          onToggleFavorite={() => handleToggleFavorite(selectedRecipe._id)} 

        />
      )}
    </div>
  );
}
