"use client";
import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import styles from "@/styles/RecipeDetails.module.css";


type RecipeDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: {
    _id: string;
    url_image: string;
    recipe_name: string;
    categoryName: string;
    instructions: string;
    ingredients: string[];
  };
  isFavorite: boolean; 
  onToggleFavorite: () => void; 

};

export default function RecipeDetails({
  isOpen,
  onClose,
  recipe,
  isFavorite,
  onToggleFavorite,
}: RecipeDetailsProps) {

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <div className={styles.content}>
          
          <div className={styles.info}>
            <h2 className={styles.name}>{recipe.recipe_name}</h2>
            <div className={styles.categoryContainer}>
              <p className={styles.category}>Category: {recipe.categoryName}</p>
              {isFavorite ? (
                <AiFillStar className={styles.starIcon} onClick={onToggleFavorite} />
              ) : (
                <AiOutlineStar className={styles.starIcon} onClick={onToggleFavorite} />
              )}
            </div>
            <p className={styles.ingredientsTitle}>Ingredients:</p>
            <ul className={styles.ingredientsList}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <img className={styles.image} src={recipe.url_image} alt={recipe.recipe_name} />
        </div>
        <hr className={styles.divider} />
        <p className={styles.instructions}><b>Instructions:</b> {recipe.instructions}</p>
      </div>
    </div>
  );
}
