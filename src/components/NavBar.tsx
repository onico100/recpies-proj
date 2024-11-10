'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/NavBar.module.css'
import { getAllCategories } from '@/services/categoriesService';


type Category = {
    _id: string;
    category_name: string;
}
export default function NavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const loadCategories = async () => {
            const categoriesData = await getAllCategories();
            console.log("categories: ", categoriesData);
            setCategories(categoriesData);
        };
        loadCategories();
    }, []);

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
                                <li key={category._id} onClick={() => handleCategoryChange(category._id)}>
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



