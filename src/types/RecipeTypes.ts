import { z } from "zod";

export type Recipe = {
  _id: string;
  url_image: string;
  recipe_name: string;
  categoryId: string;
  instructions: string;
  ingredients: string[];
};

export const recipeSchema = z.object({
  recipe_name: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters")
    .min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  instructions: z.string().min(1, "Instructions are required"),
  url_image: z.string().url("Invalid URL format"),
  ingredients: z
    .array(z.string())
    .min(1, "At least one ingredient is required"),
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;
