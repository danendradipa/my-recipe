<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { recipesApi } from '../api/recipes'
import type { Recipe } from '../types/recipe'

const route = useRoute()
const router = useRouter()
const recipe = ref<Recipe | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    recipe.value = await recipesApi.getById(id)
  } catch (e) {
    error.value = 'Failed to load recipe'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="recipe-detail min-h-screen">
    <div v-if="loading" class="max-w-4xl mx-auto px-4 py-12">
      <div class="animate-pulse">
        <div class="bg-gray-300 h-96 rounded-lg mb-8"></div>
        <div class="h-8 bg-gray-300 rounded mb-4"></div>
        <div class="h-4 bg-gray-300 rounded mb-2"></div>
        <div class="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>

    <div v-else-if="error || !recipe" class="max-w-4xl mx-auto px-4 py-12 text-center">
      <div class="text-6xl mb-4">😢</div>
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Recipe not found</h2>
      <button
        @click="router.push('/recipes')"
        class="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
      >
        Back to Recipes
      </button>
    </div>

    <div v-else>
      <div class="relative h-96 overflow-hidden">
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div class="absolute bottom-8 left-0 right-0">
          <div class="max-w-4xl mx-auto px-4">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
              {{ recipe.name }}
            </h1>
            <div class="flex items-center space-x-4 text-white">
              <span class="flex items-center">
                <span class="text-2xl mr-2">⭐</span>
                {{ recipe.rating }} ({{ recipe.reviewCount }} reviews)
              </span>
              <span>•</span>
              <span>{{ recipe.cuisine }}</span>
              <span>•</span>
              <span class="px-3 py-1 bg-white/20 rounded-full">{{ recipe.difficulty }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div class="bg-white p-4 rounded-lg shadow text-center">
            <div class="text-3xl mb-2">⏱️</div>
            <div class="text-sm text-gray-600">Prep Time</div>
            <div class="text-lg font-semibold">{{ recipe.prepTimeMinutes }} min</div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow text-center">
            <div class="text-3xl mb-2">🍳</div>
            <div class="text-sm text-gray-600">Cook Time</div>
            <div class="text-lg font-semibold">{{ recipe.cookTimeMinutes }} min</div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow text-center">
            <div class="text-3xl mb-2">👥</div>
            <div class="text-sm text-gray-600">Servings</div>
            <div class="text-lg font-semibold">{{ recipe.servings }}</div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow text-center">
            <div class="text-3xl mb-2">🔥</div>
            <div class="text-sm text-gray-600">Calories</div>
            <div class="text-lg font-semibold">{{ recipe.caloriesPerServing }}</div>
          </div>
        </div>

        <div class="mb-12">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in recipe.tags"
              :key="tag"
              class="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="bg-white p-8 rounded-lg shadow mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul class="space-y-3">
            <li
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
              class="flex items-start"
            >
              <span class="text-orange-600 mr-3 mt-1">✓</span>
              <span class="text-gray-700">{{ ingredient }}</span>
            </li>
          </ul>
        </div>

        <div class="bg-white p-8 rounded-lg shadow mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
          <ol class="space-y-4">
            <li
              v-for="(instruction, index) in recipe.instructions"
              :key="index"
              class="flex"
            >
              <span class="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                {{ index + 1 }}
              </span>
              <p class="text-gray-700 pt-1">{{ instruction }}</p>
            </li>
          </ol>
        </div>

        <div class="text-center">
          <button
            @click="router.push('/recipes')"
            class="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back to Recipes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>