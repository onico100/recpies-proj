import React, { useEffect } from 'react';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/services/categoriesService';
import { Category } from '@/stores/categoriesStore';

const CategoriesFetcher = () => {
  const { setCategories } = useCategoriesStore();

  const { data, error, isLoading } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime: 300000,
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data, setCategories]);

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }

  return null;
};

export default CategoriesFetcher;
