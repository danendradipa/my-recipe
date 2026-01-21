import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { recipesApi } from '../api/recipes'
import type { Recipe } from '../types/recipe'

export function useSearch() {
  const router = useRouter()
  const searchQuery = ref('')
  const searchResults = ref<Recipe[]>([])
  const isSearching = ref(false)
  const error = ref<string | null>(null)

  const search = async (query: string) => {
    if (!query.trim()) {
      searchResults.value = []
      return
    }

    isSearching.value = true
    error.value = null
    try {
      const data = await recipesApi.search(query)
      searchResults.value = data.recipes
    } catch (e) {
      error.value = 'Search failed'
      console.error(e)
    } finally {
      isSearching.value = false
    }
  }

  const handleSearch = () => {
    if (searchQuery.value.trim()) {
      router.push({ name: 'Recipes', query: { search: searchQuery.value } })
    } else {
      router.push({ name: 'Recipes' })
    }
  }

  const clearSearch = () => {
    searchQuery.value = ''
    router.push({ name: 'Recipes' })
  }

  return {
    searchQuery,
    searchResults,
    isSearching,
    error,
    search,
    handleSearch,
    clearSearch
  }
}