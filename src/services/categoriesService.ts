import my_http from "@/services/http";

  export async function getAllCategories() {
      try {
          const response = await my_http.get("/categories");
          console.log(response.data);
          return response.data;
      }
      catch (error) {
          console.error(error);
      }
  }