# Recipes App

This is a Next.js application for managing recipes, where users can add, view, delete, categorize, and mark recipes as favorites. Users can also search for recipes by name and filter them by category.

## Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/onico100/recpies-proj.git
```

2. **Install dependencys:**

```bash
   cd recpies-proj
   npm install
```

3. **Set up MongoDB:**

- Make sure you have a MongoDB instance running.

- put your MongoDB connection string in the next.config.mjs file.

4. **Run the app:**

```bash
   npm run dev
```

- Open your browser and go to http://localhost:3000.

3. **Usage:**

   # 1.Adding a Recipe:

   - Click on the "Add Recipe" button.
   - Fill in the recipe details (name, category, image URL, description).
   - Submit to add it to the list.

   # 2.Deleting a Recipe:

   - Click the delete (trash) icon on any recipe card to remove it from the list.

   # 3.Filtering by Category:

   - Select a category from the dropdown to filter the recipes..

   # 4.Searching Recipes:

   - Use the search bar to find recipes by name.

   # 5.Favoriting Recipes:

   - Click the star icon on a recipe card to mark it as a favorite.

## Features

- Add Recipe: Add new recipes with name, category, image, and description
- Delete Recipe: Remove a recipe from the list.
- Categorize Recipes: Filter recipes by category.
- Search Recipes: Quickly find recipes by searching their names.
- Favorite Recipes: Mark recipes as favorites for easy access.

## Technologies Used

- **Frontend:**: Next.js with TypeScript.
- **Backend:** Node.js (using Next.js API routes).
- **Database:** MongoDB for data storage.
- **Styling:** CSS

## App preview

- Live Demo: View the app running here: https://recipes-proj.vercel.app/
