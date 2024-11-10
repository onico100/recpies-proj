'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/NavBar.module.css';
import { useCategoriesStore } from '@/stores/categoriesStore';

type Category = {
    _id: string;
    category_name: string;
}
export default function NavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { categories, fetchCategories } = useCategoriesStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategoryChange = (value: string) => {
        if (selectedCategories.includes(value)) {
            setSelectedCategories(selectedCategories.filter(category => category !== value));
        } else {
            setSelectedCategories([...selectedCategories, value]);
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    const removeCategory = (value: string) => {
        setSelectedCategories(selectedCategories.filter(category => category !== value));
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles.navbar}>
            <h1 className={styles.title}>Recipes</h1>
            <div className={styles.controlsContainer}>
                <div className={styles.dropdown}>
                    <button className={styles.select} onClick={toggleDropdown}>
                        {selectedCategories.length === 0 ? 'Pick a category...' :
                            <div className={styles.selectedCategories}>
                                {selectedCategories.map(category => (
                                    <div key={category} className={styles.categoryTag}>
                                        {category}
                                        <button
                                            className={styles.removeButton}
                                            onClick={() => removeCategory(category)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        }
                    </button>
                    {isDropdownOpen && (
                        <ul className={styles.dropdownMenu}>
                            {categories.map(category => (
                                <li key={category.category_id} onClick={() => handleCategoryChange(category.category_name)}>
                                    {category.category_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={styles.searchContainer}>
                    <input type="text" placeholder="Search recipes..." className={styles.searchInput} />
                </div>
                <Link href="/addRecipe">
                    <button className={styles.addRecipeButton}>
                        Add Recipe
                    </button>
                </Link>
            </div>
        </div>
    );
}
