"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/AddRecipe.module.css";
import { addRecipe } from "@/services/recipesService";
import { FaChevronLeft } from "react-icons/fa";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { recipeSchema, RecipeFormValues } from "@/types/RecipeTypes";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";


const AddRecipe = () => {
  const { categories } = useCategoriesStore.getState();
  let categoriesNames = categories.map((category) => category.category_name);
  const categoriesList = ["Choose", ...categoriesNames];
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);


  const onSubmit = async (data: RecipeFormValues) => {
    let recipe = {
      recipe_name: data.recipe_name,
      category: data.category,
      instructions: data.instructions,
      url_image: data.url_image,
      ingredients: data.ingredients,
    };

    try {
      reset();
      setIngredientList([]);
      await addRecipe(recipe);
      Swal.fire(
        "Added!",
        "Your recipe has been added successfully.",
        "success"
      );
      router.push("/");
    } catch (error) {
      Swal.fire("Error!", "There was a problem adding your recipe.", "error");
      console.error("Error adding recipe:", error);
    }
  };

  const handleAddIngredient = () => {
    if (ingredient) {
      if (editingIndex !== null) {
        setIngredientList((prev) => {
          const updatedList = [...prev];
          updatedList[editingIndex] = ingredient;
          return updatedList;
        });
        setEditingIndex(null);
      } else {
        setIngredientList((prev) => [...prev, ingredient]);
      }
      setValue("ingredients", [...ingredientList, ingredient]);
      setIngredient("");
    }
  };


  const handleEditIngredient = (index: number) => {
    setIngredient(ingredientList[index]);
    setEditingIndex(index);
  };

  const handleDeleteIngredient = (index: number) => {
    setIngredientList((prev) => prev.filter((_, i) => i !== index));
    setValue("ingredients", ingredientList.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Link href="/HomePageRoute" className={styles.backLink}>
        <FaChevronLeft />
        Back
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formContainer}
      >
        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" {...register("recipe_name")} />
          {errors.recipe_name && (
            <p className={styles.errorMessage}>
              {errors.recipe_name.message}
            </p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <select {...register("category")}>
            {categoriesList.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className={styles.errorMessage}>{errors.category.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Instructions</label>
          <textarea {...register("instructions")} />
          {errors.instructions && (
            <p className={styles.errorMessage}>
              {errors.instructions.message}
            </p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Image URL</label>
          <input type="text" {...register("url_image")} />
          {errors.url_image && (
            <p className={styles.errorMessage}>
              {errors.url_image.message}
            </p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Ingredients</label>
          <p>Press '+' for adding</p>
          <div className={styles.addIngredients}>
            <input
              type="text"
              placeholder="Add ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <button type="button" onClick={handleAddIngredient}>
              +
            </button>
          </div>
          <br />
          <ul className={styles.ingredientList}>
            {ingredientList.map((ing, index) => (
              <li key={index} className={styles.ingredientItem}>
                <div className={styles.ingredient}>
                  {ing}
                </div>
                <div className={styles.buttonContainer}>
                  <button type="button" onClick={() => handleEditIngredient(index)} ><CiEdit /></button>
                  <button type="button" onClick={() => handleDeleteIngredient(index)}>-</button>
                </div>
              </li>
            ))}
          </ul>
          {errors.ingredients && (
            <p className={styles.errorMessage}>
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
