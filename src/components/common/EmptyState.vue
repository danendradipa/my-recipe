<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  icon?: string
  title: string
  description?: string
  actionText?: string
  actionLink?: string
}>()
</script>

<template>
  <div class="text-center py-12">
    <div v-if="icon" class="text-6xl mb-4">{{ icon }}</div>
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ title }}</h2>
    <p v-if="description" class="text-gray-600 mb-4">{{ description }}</p>
    <RouterLink
      v-if="actionLink"
      :to="actionLink"
      class="inline-block px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
    >
      {{ actionText || 'Go Back' }}
    </RouterLink>
  </div>
</template>