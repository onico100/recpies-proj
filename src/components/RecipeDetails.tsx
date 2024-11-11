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
    categoryName: string;
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full transform transition-all duration-300 ease-in-out scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4">{recipe.recipe_name}</h2>
        <img
          src={recipe.url_image}
          alt={recipe.recipe_name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Category:</span> {recipe.categoryName}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-semibold">Instructions:</span> {recipe.instructions}
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
