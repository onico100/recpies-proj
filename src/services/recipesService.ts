import axios from "axios";
import my_http from "@/services/http";

  export async function getAllCars() {
      try {
          const response = await my_http.get("/recipes");
          console.log(response.data);
          return response.data;
      }
      catch (error) {
          console.error(error);
      }
  }


export const fetchCars = async () => {
  const response = await my_http.get('/recipes');
  return response.data;
};


export const addRecipe = async (car: { model_name: string; plate_number: string; color: string }) => {
  const response = await my_http.post('/recipes', car);
  return response.data;
};

export const updateRecipe = async (id: string, car: { model_name: string; plate_number: string; color: string }) => {
  await my_http.patch(`/?id=${id}`, car);
};

export const deleteRecipe = async (id: string) => {
  await my_http.delete(`/cars/?id=${id}`);
};