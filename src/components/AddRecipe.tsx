"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const recipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  instructions: z.string().min(1, "Instructions are required"),
  imageUrl: z.string().url("Invalid URL format"),
  ingredients: z.string().min(1, "Ingredients are required"),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

const AddRecipe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
  });

  const [formData, setFormData] = useState<RecipeFormValues | null>(null);

  const onSubmit = (data: RecipeFormValues) => {
    setFormData(data);
    // Handle form submission (e.g., send data to an API)
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input type="text" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Category</label>
        <input type="text" {...register("category")} />
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <div>
        <label>Instructions</label>
        <textarea {...register("instructions")} />
        {errors.instructions && <p>{errors.instructions.message}</p>}
      </div>

      <div>
        <label>Image URL</label>
        <input type="text" {...register("imageUrl")} />
        {errors.imageUrl && <p>{errors.imageUrl.message}</p>}
      </div>

      <div>
        <label>Ingredients</label>
        <textarea {...register("ingredients")} />
        {errors.ingredients && <p>{errors.ingredients.message}</p>}
      </div>

      <button type="submit">Submit</button>

      {formData && (
        <div>
          <h2>Recipe Submitted</h2>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Category:</strong> {formData.category}
          </p>
          <p>
            <strong>Instructions:</strong> {formData.instructions}
          </p>
          <p>
            <strong>Image URL:</strong> {formData.imageUrl}
          </p>
          <p>
            <strong>Ingredients:</strong> {formData.ingredients}
          </p>
        </div>
      )}
    </form>
  );
};

export default AddRecipe;
