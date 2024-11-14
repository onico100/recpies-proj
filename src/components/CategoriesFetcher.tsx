"use client";
import React, { useEffect, useState } from "react";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/categoriesService";
import { Category } from "@/types/CategogyTypes";
import styles from "@/styles/Fetchers.module.css";

const CategoriesFetcher = () => {
  const { setCategories } = useCategoriesStore();
  const [first, setFirst] = useState(1);

  const { data, error, isLoading } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 300000,
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
    setFirst(2);
  }, [data, setCategories]);

  if (isLoading) {
    return (
      <div>
        {first == 1 ? (
          <div className={styles.loadingOverlayC}>
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              Loading Categories...
            </div>
          </div>
        ) : (
          " "
        )}
      </div>
    );
  }

  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }

  return null;
};

export default CategoriesFetcher;
