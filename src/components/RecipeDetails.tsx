"use client";

import React from "react";
import styles from "@/styles/RecipeDetails.module.css";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";

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
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>
          <div className={styles.info}>
            <h2 className={styles.name}>{recipe.recipe_name}</h2>
            <div className={styles.categoryContainer}>
              <p className={styles.category}>Category: {recipe.categoryName}</p>
              {isFavorite ? (
                <IoMdHeart
                  className={styles.starIcon}
                  onClick={onToggleFavorite}
                />
              ) : (
                <FaRegHeart
                  className={styles.starIcon}
                  onClick={onToggleFavorite}
                />
              )}
            </div>
            <p className={styles.ingredientsTitle}>Ingredients:</p>
            <ul className={styles.ingredientsList}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <img
            className={styles.image}
            src={recipe.url_image}
            alt={recipe.recipe_name}
          />
        </div>
        <hr className={styles.divider} />
        <p className={styles.instructions}>
          <b>Instructions:</b> {recipe.instructions}
        </p>
      </div>
    </div>
  );
}
