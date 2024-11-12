import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {useRecipesStore } from "@/stores/recipesStore";
import { getAllRecipes } from "@/services/recipesService";
import { Recipe } from "@/types/RecipeTypes";
import styles from "@/styles/Fetchers.module.css";

const RecipesFetcher = () => {
  const { setRecipes } = useRecipesStore();

  const { data, error, isLoading } = useQuery<Recipe[], Error>({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
    staleTime: 300000,
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data, setRecipes]);

  if (isLoading) {
    return (
      <div className={styles.loadingOverlayR}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          Loading recipes...
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching recipes: {error.message}</div>;
  }

  return null;
};

export default RecipesFetcher;
