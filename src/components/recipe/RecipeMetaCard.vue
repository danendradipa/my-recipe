<script setup lang="ts">
defineProps<{
  icon: string
  label: string
  value: string | number
}>()
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow text-center">
    <div class="text-3xl mb-2">{{ icon }}</div>
    <div class="text-sm text-gray-600">{{ label }}</div>
    <div class="text-lg font-semibold">{{ value }}</div>
  </div>
</template>