import React, { useEffect, useState, useRef, useCallback } from "react";
import RecipeCard from "./RecipeCard";
import styles from "@/styles/GridRecipes.module.css";
import RecipeDetails from "./RecipeDetails";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useRecipesStore } from "@/stores/recipesStore";
import { Recipe } from "@/stores/recipesStore";
import { deleteRecipe } from "@/services/recipesService";
import { getFromLocalStorage, saveToLocalStorage } from "@/library/util";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

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
  const [visibleCount, setVisibleCount] = useState(4); 

  const { categories, fetchCategories } = useCategoriesStore();
  const { recipes, fetchRecipes } = useRecipesStore();
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchRecipes();
    const favorites = getFromLocalStorage() || [];
    setFavoriteRecipes(favorites);
  }, [fetchCategories, fetchRecipes]);

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
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      await deleteRecipe(recipeId);
      fetchRecipes();
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
      const newCount = prevCount + 4;
      console.log("Current visible count:", newCount);
      return newCount;
    });
  };

  useEffect(() => {
    if (visibleCount >= filteredRecipes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Observer entry:", entries[0].isIntersecting);
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

  // const loadMoreRecipes = () => {
  //   setVisibleCount((prevCount) => {
  //     console.log("Current visible count:", prevCount);
  //     return prevCount + 4;
  //   });
  // };


  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       console.log("Observer entry:", entries[0].isIntersecting);
  //       if (entries[0].isIntersecting) {
  //         loadMoreRecipes();
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   if (observerRef.current) {
  //     observer.observe(observerRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, [visibleCount]);

  return (
    <div className={styles.allContainer}>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${!showFavorites ? styles.activeButton : "" }`}
          onClick={() => setShowFavorites(false)} >All Recipes
        </button>
        <button className={`${styles.button} ${ showFavorites ? styles.activeButton : "" }`}
          onClick={() => setShowFavorites(true)} >
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
        <div ref={observerRef} style={{ height: "50px", backgroundColor: "transparent" }}>Loading recipes...</div>
      )}

    </div>
  );
}
