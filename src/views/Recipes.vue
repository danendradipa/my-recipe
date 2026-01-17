<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipes } from '../composables/useRecipes'
import { recipesApi } from '../api/recipes'
import RecipeCard from '../components/recipe/RecipeCard.vue'
import type { Recipe } from '../types/recipe'

const route = useRoute()
const { recipes, loading, error, fetchRecipes } = useRecipes()
const searchResults = ref<Recipe[]>([])
const isSearching = ref(false)
const searchQuery = ref('')

onMounted(async () => {
  searchQuery.value = (route.query.search as string) || ''
  
  if (searchQuery.value) {
    await handleSearch(searchQuery.value)
  } else {
    await fetchRecipes(30, 0)
  }
})

watch(() => route.query.search, async (newSearch) => {
  searchQuery.value = (newSearch as string) || ''
  
  if (searchQuery.value) {
    await handleSearch(searchQuery.value)
  } else {
    await fetchRecipes(30, 0)
  }
})

const handleSearch = async (query: string) => {
  if (!query.trim()) {
    searchResults.value = []
    return
  }
  
  isSearching.value = true
  try {
    const data = await recipesApi.search(query)
    searchResults.value = data.recipes
    console.log('Search results:', data.recipes.length) 
  } catch (e) {
    console.error('Search failed:', e)
  } finally {
    isSearching.value = false
  }
}

const displayRecipes = computed(() => 
  searchQuery.value ? searchResults.value : recipes.value
)

const isLoading = computed(() => 
  searchQuery.value ? isSearching.value : loading.value
)
</script>

<template>
  <div class="recipes-page min-h-screen">
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          {{ searchQuery ? `Search Results for "${searchQuery}"` : 'All Recipes' }}
        </h1>
        <p class="text-gray-600">
          {{ displayRecipes.length }} recipes found
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in 12" :key="n" class="animate-pulse">
          <div class="bg-gray-300 h-48 rounded-lg mb-4"></div>
          <div class="h-4 bg-gray-300 rounded mb-2"></div>
          <div class="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 text-lg">{{ error }}</p>
      </div>

      <div v-else-if="displayRecipes.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🔍</div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">No recipes found</h2>
        <p class="text-gray-600">Try searching with different keywords</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <RecipeCard
          v-for="recipe in displayRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
    </div>
  </div>
</template>