import { ref } from "vue";
import { recipesApi } from "../api/recipes";
import type { Recipe } from "../types/recipe";

export function useRecipes() {
  const recipes = ref<Recipe[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchRecipes = async (limit = 30, skip = 0) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await recipesApi.getAll(limit, skip);
      recipes.value = data.recipes;
    } catch (e) {
      error.value = "Failed to fetch recipes";
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
  };
}
