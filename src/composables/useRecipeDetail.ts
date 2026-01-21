import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { recipesApi } from "../api/recipes";
import type { Recipe } from "../types/recipe";

export function useRecipeDetail() {
  const route = useRoute();
  const recipe = ref<Recipe | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const fetchRecipe = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      if (isNaN(id)) {
        error.value = "Invalid recipe ID";
        recipe.value = null;
        loading.value = false;
        return;
      }

      const data = await recipesApi.getById(id);

      if ("message" in data && data.message) {
        error.value = "Recipe not found";
        recipe.value = null;
      } else {
        recipe.value = data as Recipe;
      }
    } catch (e) {
      error.value = "Failed to load recipe";
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    const id = Number(route.params.id);
    await fetchRecipe(id);
  });

  return {
    recipe,
    loading,
    error,
    fetchRecipe,
  };
}
