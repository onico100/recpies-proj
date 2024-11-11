"use client";
import NavBar from "@/components/NavBar";
import GridRecipes from "@/components/GridRecipes";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div>
      <NavBar
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategories} // Pass category change handler
      />
      <GridRecipes
        searchQuery={searchQuery}
        selectedCategories={selectedCategories} // Pass selected categories
      />
    </div>
  );
}
