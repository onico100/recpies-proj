"use client"
import React, { useEffect, useState, useRef } from "react";
import RecipeCard from "./RecipeCard";
import styles from "@/styles/GridRecipes.module.css";
import RecipeDetails from "./RecipeDetails";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useRecipesStore } from "@/stores/recipesStore";
import { Recipe } from "@/types/RecipeTypes";
import { deleteRecipe } from "@/services/recipesService";
import { getFromLocalStorage, saveToLocalStorage } from "@/library/util";
import { AiFillStar } from "react-icons/ai";
import ConfirmModal from "./ConfirmModal";

interface GridRecipesProps {
  searchQuery: string;
  selectedCategories: string[];
}

export default function GridRecipes({
  searchQuery,
  selectedCategories,
}: GridRecipesProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const { categories, setCategories } = useCategoriesStore();
  const { recipes, setRecipes } = useRecipesStore();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const recipeWidth = 320;
  const screenWidth = window.innerWidth;
  const recipesPerRow = Math.floor(screenWidth / recipeWidth); 
  const [visibleCount, setVisibleCount] = useState(recipesPerRow);

  
  useEffect(() => {
    let favorits = getFromLocalStorage() || [];
    setFavoriteRecipes(favorits);
  }, []);

  const handleReadMoreClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleToggleFavorite = (recipeId: string) => {
    setFavoriteRecipes((prev) => {
      const updatedFavorites = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];
      saveToLocalStorage(updatedFavorites);
      return updatedFavorites;
    });
  };

  const isRecipeFavorite = (recipeId: string) =>
    favoriteRecipes.includes(recipeId);

  const getCategoryNameById = (category_id: string) => {
    try {
      const category = categories.find((cat) => cat._id === category_id);
      return category ? category.category_name : "Unknown category";
    } catch (err) {
      console.error("Error: ", err);
      return "Error";
    }
  };

  const handleDeleteClick = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedRecipeId) {
      await deleteRecipe(selectedRecipeId);
      setRecipes(recipes.filter((recipe) => recipe._id !== selectedRecipeId));
      setSelectedRecipeId(null);
      setIsConfirmOpen(false);
    }
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
    setSelectedRecipeId(null);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesFavorites = !showFavorites || isRecipeFavorite(recipe._id);
    const matchesSearch = recipe.recipe_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(getCategoryNameById(recipe.categoryId));
    return matchesFavorites && matchesSearch && matchesCategory;
  });

  const loadMoreRecipes = () => {
    setVisibleCount((prevCount) => {
      const newCount = prevCount + recipesPerRow;
      console.log("Current visible count:", newCount);
      return newCount;
    });
  };

  useEffect(() => {
    if (visibleCount >= filteredRecipes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {if (entries[0].isIntersecting) {loadMoreRecipes(); }},
      { threshold: 0.5 }
    );
    if (observerRef.current) { observer.observe(observerRef.current);}
    return () => observer.disconnect();
  }, [visibleCount, filteredRecipes.length]);

  return (
    <div className={styles.allContainer}>
      <div className={styles.buttonContainer}>
        <button className={`${styles.button} ${!showFavorites ? styles.activeButton : "" }`}
          onClick={() => setShowFavorites(false)} > All Recipes
        </button>
        <button className={`${styles.button} ${ showFavorites ? styles.activeButton : ""}`} onClick={() => setShowFavorites(true) }>
          <div className={styles.favTitle}>
            <AiFillStar className={styles.starIcon} /> Favorites{" "}
            <AiFillStar className={styles.starIcon} />
          </div>
        </button>
      </div>
      <div className={styles.grid}>
        {filteredRecipes.slice(0, visibleCount).map((recipe) => (
          <RecipeCard
            key={recipe._id}
            url_image={recipe.url_image}
            recipe_name={recipe.recipe_name}
            category_name={getCategoryNameById(recipe.categoryId)}
            instructions={recipe.instructions}
            isFavorite={isRecipeFavorite(recipe._id)}
            onToggleFavorite={() => handleToggleFavorite(recipe._id)}
            onReadMore={() => handleReadMoreClick(recipe)}
            onDelete={() => handleDeleteClick(recipe._id)}
          />
        ))}

        {selectedRecipe && (
          <RecipeDetails
            isOpen={isSidebarOpen}
            onClose={handleCloseSidebar}
            recipe={{
              ...selectedRecipe,
              categoryName: getCategoryNameById(selectedRecipe.categoryId),
            }}
            isFavorite={isRecipeFavorite(selectedRecipe._id)}
            onToggleFavorite={() => handleToggleFavorite(selectedRecipe._id)}
          />
        )}
      </div>

      {visibleCount < filteredRecipes.length && (
        <div ref={observerRef}>
          Loading recipes...
        </div>
      )}
      {isConfirmOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this recipe?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
