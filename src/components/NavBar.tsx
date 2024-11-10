'use client'
import { useState } from 'react';
import styles from '@/styles/NavBar.module.css'

export default function NavBar()
{
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options } = event.target;
        const values = Array.from(options).filter(option => option.selected).map(option => option.value);
        setSelectedCategories(values);
    };

    return (
        <div className={styles.navbar}>
            <h1 className={styles.title}>Recipes</h1>
            <div className={styles.dropdown}>
                <button onClick={toggleDropdown} className={styles.dropdownButton}>
                    Pick a category
                </button>
                {isDropdownOpen && (
                    <select
                        multiple
                        onChange={handleCategoryChange}
                        className={styles.select}
                    >
                        <option value="appetizers">Appetizers</option>
                        <option value="main_courses">Main Courses</option>
                        <option value="desserts">Desserts</option>
                        <option value="salads">Salads</option>
                    </select>
                )}
            </div>
            <div className={styles.searchContainer}>
                <input type="text" placeholder="Search recipes..." className={styles.searchInput} />
                <button className={styles.addRecipeButton}>Add Recipe</button>
            </div>
        </div>
    );

}



