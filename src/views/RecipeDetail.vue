<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { recipesApi } from "../api/recipes";
import type { Recipe } from "../types/recipe";
import EmptyState from "../components/common/EmptyState.vue";
import RecipeMetaCard from "../components/recipe/RecipeMetaCard.vue";

const route = useRoute();
const router = useRouter();
const recipe = ref<Recipe | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const id = Number(route.params.id);

    if (isNaN(id)) {
      error.value = "Invalid recipe ID";
      loading.value = false;
      return;
    }

    const data = await recipesApi.getById(id);

    if ("message" in data && data.message) {
      error.value = "Recipe not found";
      recipe.value = null;
    } else {
      recipe.value = data;
    }
  } catch (e) {
    error.value = "Failed to load recipe";
    console.error(e);
  } finally {
    loading.value = false;
  }
});
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

    <EmptyState
      v-else-if="error || !recipe"
      icon="😢"
      title="Recipe not found"
      description="The recipe you're looking for doesn't exist or has been removed."
      actionText="Back to Recipes"
      actionLink="/recipes"
    />

    <div v-else>
      <div class="relative h-96 overflow-hidden">
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"
        ></div>
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
              <span class="px-3 py-1 bg-white/20 rounded-full">
                {{ recipe.difficulty }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <RecipeMetaCard
            icon="⏱️"
            label="Prep Time"
            :value="`${recipe.prepTimeMinutes} min`"
          />

          <RecipeMetaCard
            icon="🍳"
            label="Cook Time"
            :value="`${recipe.cookTimeMinutes} min`"
          />
          <RecipeMetaCard
            icon="👥"
            label="Servings"
            :value="recipe.servings"
          />
          <RecipeMetaCard
            icon="🔥"
            label="Calories"
            :value="recipe.caloriesPerServing"
          />
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
              <span
                class="shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold mr-4"
              >
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
