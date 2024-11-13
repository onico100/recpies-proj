"use client";
import NavBar from "@/components/NavBar";
import GridRecipes from "@/components/GridRecipes";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const queryClient = new QueryClient();

  return (
    <div>
      <NavBar
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategories}
      />
      <GridRecipes
        searchQuery={searchQuery}
        selectedCategories={selectedCategories}
      />
    </div>
  );
}
