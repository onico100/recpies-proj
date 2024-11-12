"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/NavBar.module.css";
import { useCategoriesStore } from "@/stores/categoriesStore";

interface NavBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (categories: string[]) => void;
}

export default function NavBar({ onSearch, onCategoryChange }: NavBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { categories, setCategories } = useCategoriesStore();

  let delletedCategories = false;

  const toggleDropdown = () => {
    if (delletedCategories) {
      setIsDropdownOpen(false);
      delletedCategories = false;
    }
    else
      setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryChange = (value: string) => {
    const newSelectedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter((category) => category !== value)
      : [...selectedCategories, value];
    setSelectedCategories(newSelectedCategories);

    onCategoryChange(newSelectedCategories);

    setIsDropdownOpen(!isDropdownOpen);
  };

  const removeCategory = (value: string) => {
    const newSelectedCategories = selectedCategories.filter(
      (category) => category !== value
    );
    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories);

    setIsDropdownOpen(false);

    delletedCategories = true;

  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className={styles.navbar}>
      <h1 className={styles.title}>Recipes</h1>
      <div className={styles.controlsContainer}>
        <div className={styles.dropdown}>
          <button className={styles.select} onClick={toggleDropdown}>{selectedCategories.length === 0 ? (
              "Pick a category..." ) : (
              <div className={styles.selectedCategories}>
                {selectedCategories.map((category) => (
                  <div key={category} className={styles.categoryTag}>
                    {category}
                    <button
                      className={styles.removeButton}
                      onClick={() => removeCategory(category)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </button>
          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              {categories.map((category) => (
                <li
                  key={category._id}
                  onClick={() => handleCategoryChange(category.category_name)}
                >
                  {category.category_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search recipes..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Link href="/addRecipe">
          <button className={styles.addRecipeButton}>Add Recipe</button>
        </Link>
      </div>
    </div>
  );
}
