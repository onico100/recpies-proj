 "use client";
// import {NavBar , GridRecipes, CategoriesFetcher, RecipesFetcher } from'@/components';
// import { useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// export default function Home() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

//   const queryClient = new QueryClient();

//   return (
//     <div>
//       <QueryClientProvider client={queryClient}>
//         <CategoriesFetcher />
//         <RecipesFetcher />
//         <NavBar
//           onSearch={setSearchQuery}
//           onCategoryChange={setSelectedCategories}
//         />
//         <GridRecipes
//           searchQuery={searchQuery}
//           selectedCategories={selectedCategories}
//         />
//       </QueryClientProvider>
//     </div>
//   );
// }

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavBar, GridRecipes, CategoriesFetcher, RecipesFetcher } from "@/components";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);  // מצב טעינת הקטגוריות

  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CategoriesFetcher setLoadingCategories={setLoadingCategories} />
        
        {loadingCategories ? null : <RecipesFetcher />}
        
        <NavBar
          onSearch={setSearchQuery}
          onCategoryChange={setSelectedCategories}
        />
        <GridRecipes
          searchQuery={searchQuery}
          selectedCategories={selectedCategories}
        />
      </QueryClientProvider>
    </div>
  );
}
