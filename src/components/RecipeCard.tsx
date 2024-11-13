"use client";
import React from "react";
import styles from "@/styles/RecipeCard.module.css";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { Recipe } from "@/types/RecipeTypes";

type RecipeCardProps = {
  recipe: Recipe;
  getCategory: (categoryId: string) => string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onReadMore: () => void;
  onDelete: () => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  getCategory,
  isFavorite,
  onToggleFavorite,
  onReadMore,
  onDelete,
}) => {
  const truncatedInstructions =
    recipe.instructions.length > 100
      ? `${recipe.instructions.substring(0, 100)}...`
      : recipe.instructions;

  return (
    <div className={styles.card}>
      <img
        src={recipe.url_image}
        alt={recipe.recipe_name}
        className={styles.image}
      />
      <div className={styles.header}>
        <h3 className={styles.name}>{recipe.recipe_name}</h3>
        {isFavorite ? (
          <IoMdHeart className={styles.starIcon} onClick={onToggleFavorite} />
        ) : (
          <FaRegHeart className={styles.starIcon} onClick={onToggleFavorite} />
        )}
      </div>
      <p className={styles.category}>
        <strong>Category:</strong> {getCategory(recipe.categoryId)}
      </p>
      <p className={styles.instructions}>
        <b>Instructions: </b>
        {truncatedInstructions}
      </p>
      <div className={styles.divButtons}>
        <button onClick={onReadMore} className={styles.readMoreButton}>
          Read More
        </button>
        <button onClick={onDelete} className={styles.deleteButton}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
