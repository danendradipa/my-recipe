import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { recipesApi } from "../api/recipes";
import type { Recipe } from "../types/recipe";

export function useRecipeDetail() {
  const route = useRoute()
  const recipe = ref<Recipe | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchRecipe = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      recipe.value = await recipesApi.getById(id)
    } catch (e) {
      error.value = 'Failed to load recipe'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    const id = Number(route.params.id)
    await fetchRecipe(id)
  })

  return {
    recipe,
    loading,
    error,
    fetchRecipe
  }
}