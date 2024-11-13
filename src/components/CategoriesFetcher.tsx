"use client";

// import React, { useEffect } from "react";
// import { useCategoriesStore } from "@/stores/categoriesStore";
// import { useQuery } from "@tanstack/react-query";
// import { getAllCategories } from "@/services/categoriesService";
// import { Category } from "@/types/CategogyTypes";
// import styles from "@/styles/Fetchers.module.css";

// const CategoriesFetcher = () => {
//   const { setCategories } = useCategoriesStore();

//   const { data, error, isLoading } = useQuery<Category[], Error>({
//     queryKey: ["categories"],
//     queryFn: getAllCategories,
//     staleTime: 300000,
//   });

//   useEffect(() => {
//     if (data) {
//       setCategories(data);
//     }
//   }, [data, setCategories]);

//   if (isLoading) {
//     return (
//       <div className={styles.loadingOverlayC}>
//         <div className={styles.loadingContainer}>
//           <div className={styles.spinner}></div>
//           Loading categories...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error fetching categories: {error.message}</div>;
//   }

//   return null;
// };

// export default CategoriesFetcher;
import React, { useEffect } from "react";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/categoriesService";
import { Category } from "@/types/CategogyTypes";
import styles from "@/styles/Fetchers.module.css";

interface CategoriesFetcherProps {
  setLoadingCategories: React.Dispatch<React.SetStateAction<boolean>>; 
}

const CategoriesFetcher: React.FC<CategoriesFetcherProps> = ({ setLoadingCategories }) => {
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

  useEffect(() => {
    setLoadingCategories(isLoading);
  }, [isLoading, setLoadingCategories]);

  if (isLoading) {
    return (
      <div className={styles.loadingOverlay}>
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
