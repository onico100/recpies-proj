import NavBar from "@/components/NavBar";

import AddRecipe from "@/components/AddRecipe";

import GridRecipes from "@/components/GridRecipes";

const recipes = [
  {
    id: "2",
    url_image: "https://example.com/spaghetti.jpg",
    recipe_name: "Spaghetti Bolognese",
    category: "Italian",
    instructions: "Cook pasta and mix with sauce.",
    ingredients: [
      "Spaghetti",
      "Ground Beef",
      "Tomato Sauce",
      "Garlic",
      "Onion",
      "Olive Oil",
    ],
  },
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
