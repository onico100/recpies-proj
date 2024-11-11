"use client";
import React from "react";
import styles from "@/styles/RecipeCard.module.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaTrash } from 'react-icons/fa'; 

type RecipeCardProps = {
  url_image: string;
  recipe_name: string;
  category_name:  string;
  instructions: string;
  isFavorite: boolean; 
  onToggleFavorite: () => void; 
  onReadMore: () => void;
  onDelete: () => void; 
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  url_image,
  recipe_name,
  category_name,
  instructions,
  isFavorite,
  onToggleFavorite,
  onReadMore,
  onDelete,
}) => {
  const truncatedInstructions =
    instructions.length > 100
      ? `${instructions.substring(0, 100)}...`
      : instructions;



  return (
    <div className={styles.card}>
      <img src={url_image} alt={recipe_name} className={styles.image} />
      <div className={styles.header}>
        <h3 className={styles.name}>
          {recipe_name}
        </h3>
        {isFavorite ? (
          <AiFillStar className={styles.starIcon} onClick={onToggleFavorite} />
        ) : (
          <AiOutlineStar className={styles.starIcon} onClick={onToggleFavorite} />
        )}
      </div>
      <p className={styles.category}>
        <strong>Category:</strong> {category_name}
      </p>
      <p className={styles.instructions}>{truncatedInstructions}</p>
      <button onClick={onReadMore} className={styles.readMoreButton}>
        Read More
      </button>
      <button onClick={onDelete} className={styles.deleteButton}>
          <FaTrash /> 
        </button>
    </div>
  );
};

export default RecipeCard;
