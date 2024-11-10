// GridRecipes.tsx
import React from "react";
import RecipeCard from "./RecipeCard";
import styles from "@/styles/GridRecipes.module.css";

type Recipe = {
  id: string;
  url_image: string;
  recipe_name: string;
  category: string;
  instructions: string;
};

type GridRecipesProps = {
  recipes: Recipe[];
};

const GridRecipes: React.FC<GridRecipesProps> = ({ recipes }) => {
  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          url_image={recipe.url_image}
          recipe_name={recipe.recipe_name}
          category={recipe.category}
          instructions={recipe.instructions}
        />
      ))}
    </div>
  );
};

export default GridRecipes;
