'use client'
import { useState } from 'react';
import styles from '@/styles/NavBar.module.css'

export default function NavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string | null>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategories(value);
        setIsDropdownOpen(false); 

    };

    return (
        <div className={styles.navbar}>
            <h1 className={styles.title}>Recipes</h1>
            <div className={styles.controlsContainer}>
            <div className={styles.dropdown}>
                    <button className={styles.select} onClick={toggleDropdown}>
                        {selectedCategories || 'Pick a category...'} {}
                    </button>
                    {isDropdownOpen && (
                        <ul className={styles.dropdownMenu}>
                            <li onClick={() => handleCategoryChange('appetizers')}>Appetizers</li>
                            <li onClick={() => handleCategoryChange('main_courses')}>Main Courses</li>
                            <li onClick={() => handleCategoryChange('desserts')}>Desserts</li>
                            <li onClick={() => handleCategoryChange('salads')}>Salads</li>
                        </ul>
                    )}
                </div>
                <div className={styles.searchContainer}>
                    <input type="text" placeholder="Search recipes..." className={styles.searchInput} />
                </div>
                <button className={styles.addRecipeButton}>Add Recipe</button>
            </div>
        </div>
    );

}



