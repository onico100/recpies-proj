"use client";
import React, { useState } from "react";
import styles from "@/styles/RecipeCard.module.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";


type RecipeCardProps = {
  url_image: string;
  recipe_name: string;
  category_name: string;
  instructions: string;
  onReadMore: () => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  url_image,
  recipe_name,
  category_name,
  instructions,
  onReadMore,
}) => {
  const [isFavorite, setIsFavorite] = useState(false); // Highlight: State for favorite

  const truncatedInstructions =
    instructions.length > 100
      ? `${instructions.substring(0, 100)}...`
      : instructions;

  const handleToggleFavorite = () => { // Highlight: Function to toggle favorite
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className={styles.card}>
      <img src={url_image} alt={recipe_name} className={styles.image} />
      <div className={styles.header}>
        <h3 className={styles.name}>
          {recipe_name}
        </h3>
        {isFavorite ? (
            <AiFillStar
              className={styles.starIcon}
              onClick={handleToggleFavorite}
            />
          ) : (
            <AiOutlineStar
              className={styles.starIcon}
              onClick={handleToggleFavorite}
            />
          )}
      </div>
      <p className={styles.category}>
        <strong>Category:</strong> {category_name}
      </p>
      <p className={styles.instructions}>{truncatedInstructions}</p>
      <button onClick={onReadMore} className={styles.readMoreButton}>
        Read More
      </button>
    </div>
  );
};

export default RecipeCard;
