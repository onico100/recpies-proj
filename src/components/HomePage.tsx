"use client";
import NavBar from "@/components/NavBar";
import GridRecipes from "@/components/GridRecipes";
import { useState } from "react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
