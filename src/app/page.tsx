"use client";
import NavBar from "@/components/NavBar";
import GridRecipes from "@/components/GridRecipes";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <NavBar onSearch={setSearchQuery} />
      <GridRecipes searchQuery={searchQuery} />
    </div>
  );
}
