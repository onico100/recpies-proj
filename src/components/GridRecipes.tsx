




// GridRecipes.tsx
"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import styles from "@/styles/GridRecipes.module.css";
import { getAllRecipes } from "@/services/recipesService";
import RecipeDetails from "./RecipeDetails";


type Recipe = {
  _id: string;
  url_image: string;
  recipe_name: string;
  category: string;
  instructions: string;
  ingredients: string[];
};




export default function GridRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
   const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const recipesData = await getAllRecipes();
        console.log("page: ",recipesData);
        setRecipes(recipesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'שגיאה לא ידועה');
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, []);

  
  

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
          key={recipe._id}
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

