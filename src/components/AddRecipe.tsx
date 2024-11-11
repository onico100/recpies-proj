"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/AddRecipe.module.css";
import { addRecipe } from "@/services/recipesService";
import { FaChevronLeft } from 'react-icons/fa';
import { ObjectId } from "mongodb";

const categories = ["Choose", "Appetizer", "Main Corse", "Dessert"];

const recipeSchema = z.object({
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

type RecipeFormValues = z.infer<typeof recipeSchema>;

const AddRecipe = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
  });

  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState<string[]>([]);

  const onSubmit = (data: RecipeFormValues) => {
    let recipe = { recipe_name: data.recipe_name, category: data.category, instructions: data.instructions, url_image: data.url_image, ingredients: data.ingredients }

    addRecipe(recipe)

    console.log(data, 300);

    reset();
    setIngredientList([]);
    router.push("/");
  };

  const handleAddIngredient = () => {
    if (ingredient) {
      setIngredientList((prev) => [...prev, ingredient]);
      setValue("ingredients", [...ingredientList, ingredient]);
      setIngredient("");
    }
  };

  return (
    <div>
      <Link href="/" className={styles.backLink}>
        <FaChevronLeft />
          Back
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form-container"]}
      >
        <div className={styles["form-group"]}>
          <label>Name</label>
          <input type="text" {...register("recipe_name")} />
          {errors.recipe_name && (
            <p className={styles["error-message"]}>
              {errors.recipe_name.message}
            </p>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label>Category</label>
          <select {...register("category")}>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className={styles["error-message"]}>{errors.category.message}</p>
          )}
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
          <input type="text" {...register("url_image")} />
          {errors.url_image && (
            <p className={styles["error-message"]}>{errors.url_image.message}</p>
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
      </form>
    </div>
  );
};

export default AddRecipe;
