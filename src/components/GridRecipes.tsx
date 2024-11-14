"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/GridRecipes.module.css";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useRecipesStore } from "@/stores/recipesStore";
import { Recipe } from "@/types/RecipeTypes";
import { deleteRecipe } from "@/services/recipesService";
import { getFromLocalStorage, saveToLocalStorage } from "@/library/util";
import { IoMdHeart } from "react-icons/io";
import { RecipeDetails, RecipeCard } from "./";
import { handleConfirmDelete } from "@/library/alerts";
import Swal from "sweetalert2";

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
  const [screenWidth, setScreenWidth] = useState(0);

  const { categories, setCategories } = useCategoriesStore();
  const { recipes, setRecipes } = useRecipesStore();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const recipeWidth = 320;

  const recipesPerRow = Math.floor(screenWidth / recipeWidth);
  const [visibleCount, setVisibleCount] = useState(recipesPerRow);

  useEffect(() => {
    if (visibleCount <= 2) loadMoreRecipes();
  });

  useEffect(() => {
    if (visibleCount <= 2) loadMoreRecipes();
    let favorits = getFromLocalStorage() || [];
    setFavoriteRecipes(favorits);
    setScreenWidth(window.innerWidth);
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

  const handleDeleteClick = async (recipeId: string) => {
    const isConfirmed = await handleConfirmDelete();

    if (isConfirmed) {
      // If the user confirms, proceed with deletion
      deleteRecipe(recipeId);
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));

      Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
    }
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
      return newCount;
    });
  };

  useEffect(() => {
    if (visibleCount >= filteredRecipes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreRecipes();
        }
      },
      { threshold: 0.5 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [visibleCount, filteredRecipes.length]);

  return (
    <div>
      <div className={styles.allContainer}>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${
              !showFavorites ? styles.activeButton : ""
            }`}
            onClick={() => setShowFavorites(false)}
          >
            {" "}
            All Recipes
          </button>
          <button
            className={`${styles.button} ${
              showFavorites ? styles.activeButton : ""
            }`}
            onClick={() => setShowFavorites(true)}
          >
            <div className={styles.favTitle}>
              <IoMdHeart className={styles.starIcon} /> Favorites{" "}
              <IoMdHeart className={styles.starIcon} />
            </div>
          </button>
        </div>
        <div className={styles.grid}>
          {filteredRecipes.slice(0, visibleCount).map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              getCategory={getCategoryNameById}
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
          <div ref={observerRef}>Loading recipes...</div>
        )}
      </div>
    </div>
  );
}
