import NavBar from "@/components/NavBar";

import AddRecipe from "@/components/AddRecipe";

import GridRecipes from "@/components/GridRecipes";

const recipes = [
  {
    id: "1",
    url_image: "https://via.placeholder.com/150",
    recipe_name: "Spaghetti Carbonara",
    category: "Main Course",
    instructions: "Boil pasta, fry pancetta, and mix with eggs and cheese.",
  },
  // Add more recipes
];

export default function Home() {
  return (
    <div>
      <NavBar />

      <h1>hello world</h1>
      <GridRecipes recipes={recipes} />
    </div>
  );
}
