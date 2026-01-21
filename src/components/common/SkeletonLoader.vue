<script setup lang="ts">
defineProps<{
  type?: 'card' | 'detail' | 'grid'
  count?: number
}>()
</script>

<template>
  <div v-if="type === 'card'" class="animate-pulse">
    <div class="bg-gray-300 h-48 rounded-lg mb-4"></div>
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-2/3"></div>
  </div>

  <div v-else-if="type === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="n in count" :key="n" class="animate-pulse">
      <div class="bg-gray-300 h-48 rounded-lg mb-4"></div>
      <div class="h-4 bg-gray-300 rounded mb-2"></div>
      <div class="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  </div>

  <div v-else-if="type === 'detail'" class="animate-pulse">
    <div class="bg-gray-300 h-96 rounded-lg mb-8"></div>
    <div class="h-8 bg-gray-300 rounded mb-4"></div>
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-2/3"></div>
  </div>
</template>