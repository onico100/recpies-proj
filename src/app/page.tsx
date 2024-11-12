"use client";
import NavBar from "@/components/NavBar";
import GridRecipes from "@/components/GridRecipes";
import { useState } from "react";
import CategoriesFetcher from "@/components/CategoriesFetcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RecipesFetcher from "@/components/RecipesFetcher";

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
