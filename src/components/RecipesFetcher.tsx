"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecipesStore } from "@/stores/recipesStore";
import { getAllRecipes } from "@/services/recipesService";
import { Recipe } from "@/types/RecipeTypes";
import styles from "@/styles/Fetchers.module.css";

const RecipesFetcher = () => {
  console.log("RecipeFetcher enterd");
  const { setRecipes } = useRecipesStore();
  const [first, setFirst] = useState(1);

  const { data, error, isLoading, isError } = useQuery<Recipe[], Error>({
    queryKey: ["recipes"],

    queryFn: getAllRecipes,
    staleTime: 300000,
  });

  useEffect(() => {
    if (data) {
      console.log("first ", first);
      setRecipes(data);
      console.log("recipes fetched use effect", data);
      console.log("first after ", first);
    }
    setFirst(2);
  }, [data, setRecipes]);

  if (isLoading) {
    return (
      <div>
        {first == 1 ? (
          <div className={styles.loadingOverlayR}>
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>Loading Recipes...
            </div>
          </div>
        ) : (
          " "
        )}
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching recipes: {error?.message}</div>;
  }

  return null;
};

export default RecipesFetcher;
