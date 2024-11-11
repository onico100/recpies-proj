// RecipeDetails.tsx
"use client";
import React from "react";
import styles from "@/styles/RecipeDetails.module.css";


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
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2 className={styles.recipeName}>{recipe.recipe_name}</h2>
        <img className={styles.image} src={recipe.url_image} alt={recipe.recipe_name} />
        <p>Category: {recipe.categoryName}</p> {/* Show category name */}
        <p>Instructions: {recipe.instructions}</p>
        <ul className={styles.ingredient}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
