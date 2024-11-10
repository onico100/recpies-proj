"use client";
import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import styles from "@/styles/GridRecipes.module.css";
import RecipeDetails from "./RecipeDetails";

type Recipe = {
  id: string;
  url_image: string;
  recipe_name: string;
  category: string;
  instructions: string;
  ingredients: string[];
};

type GridRecipesProps = {
  recipes: Recipe[];
};

const GridRecipes: React.FC<GridRecipesProps> = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleReadMoreClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          url_image={recipe.url_image}
          recipe_name={recipe.recipe_name}
          category={recipe.category}
          instructions={recipe.instructions}
          onReadMore={() => handleReadMoreClick(recipe)} // Passing the function to handle Read More
        />
      ))}

      {/* Sidebar for Recipe Details */}
      {selectedRecipe && (
        <RecipeDetails
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
          recipe={selectedRecipe}
        />
      )}
    </div>
  );
};

export default GridRecipes;
