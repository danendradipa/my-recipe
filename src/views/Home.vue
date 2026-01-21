<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipes } from '../composables/useRecipes'
import RecipeCard from '../components/recipe/RecipeCard.vue'

const router = useRouter()
const { recipes, loading, fetchRecipes } = useRecipes()

onMounted(() => {
  fetchRecipes(6, 0) 
})
</script>

<template>
  <div class="home">
    <section class="bg-linear-to-r from-orange-500 to-red-500 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          Welcome to MyRecipe
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-orange-100">
          Discover delicious recipes from around the world
        </p>
        <button
          @click="router.push('/recipes')"
          class="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-orange-50 transition shadow-lg"
        >
          Browse Recipes
        </button>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Featured Recipes</h2>
      
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="animate-pulse">
          <div class="bg-gray-300 h-48 rounded-lg mb-4"></div>
          <div class="h-4 bg-gray-300 rounded mb-2"></div>
          <div class="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>

      <div class="text-center mt-12">
        <button
          @click="router.push('/recipes')"
          class="px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          View All Recipes
        </button>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-12">
          Why Choose MyRecipe?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-5xl mb-4">🍽️</div>
            <h3 class="text-xl font-semibold mb-2">Diverse Recipes</h3>
            <p class="text-gray-600">
              Explore recipes from various cuisines and difficulty levels
            </p>
          </div>
          <div class="text-center">
            <div class="text-5xl mb-4">⏱️</div>
            <h3 class="text-xl font-semibold mb-2">Quick & Easy</h3>
            <p class="text-gray-600">
              Find recipes that fit your schedule with prep time filters
            </p>
          </div>
          <div class="text-center">
            <div class="text-5xl mb-4">⭐</div>
            <h3 class="text-xl font-semibold mb-2">Top Rated</h3>
            <p class="text-gray-600">
              Discover highly rated recipes loved by our community
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>