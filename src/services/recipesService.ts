import my_http from "@/services/http";
import { ObjectId } from "mongodb";

  export async function getAllRecipes() {
      try {
          const response = await my_http.get("/recipes");
          console.log(response.data);
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


export const addRecipe = async (recipe: { recipe_name: string; category: ObjectId; instructions: string;url_image:string;ingredients:Array<string> }) => {
  const response = await my_http.post('/recipes', recipe);
  return response.data;
};

export const updateRecipe = async (id: string, recipe: { recipe_name: string; category: string; instructions: string;url_image:string;ingredients:Array<string> }) => {
  await my_http.patch(`/?_id=${id}`, recipe);
};

export const deleteRecipe = async (id: string) => {
  await my_http.delete(`/recipes/?_id=${id}`);
};