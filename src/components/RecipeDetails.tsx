// RecipeDetails.tsx
"use client";
import React from "react";

type RecipeDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: {
    _id: string;
    url_image: string;
    recipe_name: string;
    categoryName: string; // Updated to receive category name
    instructions: string;
    ingredients: string[];
  };
};

export default function RecipeDetails({
  isOpen,
  onClose,
  recipe,
}: RecipeDetailsProps) {
  if (!isOpen) return null;

  return (
    <div>
      <button onClick={onClose}>Close</button>
      <h2>{recipe.recipe_name}</h2>
      <img src={recipe.url_image} alt={recipe.recipe_name} />
      <p>Category: {recipe.categoryName}</p> {/* Show category name */}
      <p>Instructions: {recipe.instructions}</p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}
