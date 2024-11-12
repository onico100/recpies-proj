import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Recipe, useRecipesStore } from '@/stores/recipesStore';
import { getAllRecipes } from '@/services/recipesService';

const RecipesFetcher = () => {
  const { setRecipes } = useRecipesStore();

  const { data, error, isLoading } = useQuery<Recipe[], Error>({
    queryKey: ['recipes'],
    queryFn: getAllRecipes,
    staleTime: 300000,
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data, setRecipes]);

  if (isLoading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error fetching recipes: {error.message}</div>;
  }

  return null;
};

export default RecipesFetcher;
