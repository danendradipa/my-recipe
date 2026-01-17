<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'Recipes', query: { search: searchQuery.value } })
    isMobileMenuOpen.value = false
  }
}
</script>

<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0">
          <RouterLink to="/" class="flex items-center space-x-2">
            <span class="text-2xl">🍳</span>
            <span class="text-xl font-bold text-orange-600">MyRecipe</span>
          </RouterLink>
        </div>

        <div class="hidden md:flex flex-1 max-w-md mx-8">
          <form @submit.prevent="handleSearch" class="w-full">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search recipes..."
                class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="submit"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
            to="/"
            class="text-gray-700 hover:text-orange-600 font-medium transition"
            active-class="text-orange-600"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/recipes"
            class="text-gray-700 hover:text-orange-600 font-medium transition"
            active-class="text-orange-600"
          >
            Recipes
          </RouterLink>
          <RouterLink
            to="/about"
            class="text-gray-700 hover:text-orange-600 font-medium transition"
            active-class="text-orange-600"
          >
            About
          </RouterLink>
        </div>

        <div class="md:hidden">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="text-gray-700 hover:text-orange-600 focus:outline-none"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="isMobileMenuOpen" class="md:hidden pb-4">
        <form @submit.prevent="handleSearch" class="mb-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search recipes..."
              class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        <div class="flex flex-col space-y-2">
          <RouterLink
            to="/"
            @click="isMobileMenuOpen = false"
            class="px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition"
            active-class="bg-orange-50 text-orange-600"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/recipes"
            @click="isMobileMenuOpen = false"
            class="px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition"
            active-class="bg-orange-50 text-orange-600"
          >
            Recipes
          </RouterLink>
          <RouterLink
            to="/about"
            @click="isMobileMenuOpen = false"
            class="px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition"
            active-class="bg-orange-50 text-orange-600"
          >
            About
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>