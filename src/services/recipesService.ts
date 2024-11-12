import my_http from "@/services/http";
import { useCategoriesStore } from "@/stores/categoriesStore";

export async function getAllRecipes() {
  try {
    const response = await my_http.get("/recipes");
    return response.data;
  }
  catch (error) {
    console.error(error);
  }
}

export const fetchRecipes = async () => {
  const response = await my_http.get('/recipes');
  return response.data;
};

export const addRecipe = async (recipe: { recipe_name: string; category: string; instructions: string; url_image: string; ingredients: Array<string> }) => {
  const { categories } = useCategoriesStore.getState();

  let category = categories.filter((c: any) => c.category_name === recipe.category)[0]
  let recipeToSend = { recipe_name: recipe.recipe_name, categoryId: category?._id, instructions: recipe.instructions, url_image: recipe.url_image, ingredients: recipe.ingredients }

  const response = await my_http.post('/recipes', recipeToSend);
  return response.data;
};

export const updateRecipe = async (id: string, recipe: { recipe_name: string; category: string; instructions: string; url_image: string; ingredients: Array<string> }) => {
  await my_http.patch(`/?_id=${id}`, recipe);
};

export const deleteRecipe = async (id: string) => {
  await my_http.delete(`/recipes/?_id=${id}`);
};