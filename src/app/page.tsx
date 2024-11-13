"use client";
import {NavBar , GridRecipes, CategoriesFetcher, RecipesFetcher } from'@/components';
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CategoriesFetcher />
        <RecipesFetcher/>
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
