"use client";
import HomePage from "@/components/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RecipesFetcher from "@/components/RecipesFetcher";
import CategoriesFetcher from "@/components/CategoriesFetcher";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CategoriesFetcher />
        <RecipesFetcher />
        <HomePage></HomePage>
      </QueryClientProvider>
    </div>
  );
}
