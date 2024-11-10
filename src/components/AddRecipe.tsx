"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "@/styles/AddRecipe.module.css";

const categories = ["Appetizer", "Main Course", "Dessert"];

const recipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  instructions: z.string().min(1, "Instructions are required"),
  imageUrl: z.string().url("Invalid URL format"),
  ingredients: z
    .array(z.string())
    .min(1, "At least one ingredient is required"),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

const RecipeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
  });

  const [formData, setFormData] = useState<RecipeFormValues | null>(null);
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState(categories);
  const [newCategory, setNewCategory] = useState("");

  const onSubmit = (data: RecipeFormValues) => {
    setFormData(data);
    console.log(data);
    reset();
    setIngredientList([]);
  };

  const handleAddIngredient = () => {
    if (ingredient) {
      setIngredientList((prev) => [...prev, ingredient]);
      setValue("ingredients", [...ingredientList, ingredient]);
      setIngredient("");
    }
  };

  const handleAddCategory = () => {
    if (newCategory) {
      setCategoryList((prev) => [...prev, newCategory]);
      setNewCategory("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["form-container"]}
    >
      <div className={styles["form-group"]}>
        <label>Name</label>
        <input type="text" {...register("name")} />
        {errors.name && (
          <p className={styles["error-message"]}>{errors.name.message}</p>
        )}
      </div>

      <div className={styles["form-group"]}>
        <label>Category</label>
        <select {...register("category")}>
          {categoryList.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className={styles["error-message"]}>{errors.category.message}</p>
        )}

        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="button" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      <div className={styles["form-group"]}>
        <label>Instructions</label>
        <textarea {...register("instructions")} />
        {errors.instructions && (
          <p className={styles["error-message"]}>
            {errors.instructions.message}
          </p>
        )}
      </div>

      <div className={styles["form-group"]}>
        <label>Image URL</label>
        <input type="text" {...register("imageUrl")} />
        {errors.imageUrl && (
          <p className={styles["error-message"]}>{errors.imageUrl.message}</p>
        )}
      </div>

      <div className={styles["form-group"]}>
        <label>Ingredients</label>
        <input
          type="text"
          placeholder="Add ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <ul className={styles["ingredient-list"]}>
          {ingredientList.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
        {errors.ingredients && (
          <p className={styles["error-message"]}>
            {errors.ingredients.message}
          </p>
        )}
      </div>

      <button type="submit">Submit</button>

      {formData && (
        <div className={styles["recipe-data"]}>
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
            <strong>Ingredients:</strong> {formData.ingredients.join(", ")}
          </p>
        </div>
      )}
    </form>
  );
};

export default RecipeForm;
