"use client";
import React from "react";
import styles from "@/styles/RecipeCard.module.css";

type RecipeCardProps = {
  url_image: string;
  recipe_name: string;
  category: string;
  instructions: string;
  onReadMore: () => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  url_image,
  recipe_name,
  category,
  instructions,
  onReadMore,
}) => {
  const truncatedInstructions =
    instructions.length > 100
      ? `${instructions.substring(0, 100)}...`
      : instructions;

  return (
    <div className={styles.card}>
      <img src={url_image} alt={recipe_name} className={styles.image} />
      <h3 className={styles.name}> {recipe_name}</h3>
      <p className={styles.category}>
        <strong>Category:</strong> {category}
      </p>
      <p className={styles.instructions}>{truncatedInstructions}</p>
      <button onClick={onReadMore} className={styles.readMoreButton}>
        Read More
      </button>
    </div>
  );
};

export default RecipeCard;
