import my_http from "@/services/http";

export async function getAllCategories() {
    try {
        const response = await my_http.get("/categories");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}