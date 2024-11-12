import React, { useEffect } from "react";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/categoriesService";
import { Category } from "@/stores/categoriesStore";
import styles from "@/styles/Fetchers.module.css";

const CategoriesFetcher = () => {
  const { setCategories } = useCategoriesStore();

  const { data, error, isLoading } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 300000,
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data, setCategories]);

  if (isLoading) {
    return (
      <div className={styles.loadingOverlayC}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }

  return null;
};

export default CategoriesFetcher;
