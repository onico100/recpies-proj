"use client";

import { useState } from "react";

interface RecipeDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: {
    recipe_name: string;
    category: string;
    instructions: string;
    url_image: string;
    ingredients: string[];
  };
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  isOpen,
  onClose,
  recipe,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-300px", // Sidebar slides in/out
        width: "300px",
        height: "100%",
        backgroundColor: "white",
        boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        transition: "right 0.3s ease",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onClose}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        Close
      </button>
      <h2>{recipe.recipe_name}</h2>
      <p>
        <strong>Category:</strong> {recipe.category}
      </p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>
        <strong>Instructions:</strong>
      </p>
      <p>{recipe.instructions}</p>
      <img
        src={recipe.url_image}
        alt={recipe.recipe_name}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default RecipeDetails;
