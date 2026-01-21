<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}>(), {
  variant: 'primary',
  size: 'lg' 
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :disabled="disabled || loading"
    @click="emit('click', $event)"
    :class="[
      'rounded-lg font-semibold transition inline-flex items-center justify-center',
      {
        'bg-orange-600 text-white hover:bg-orange-700': variant === 'primary',
        
        'bg-white text-orange-600 shadow-lg hover:bg-orange-50': variant === 'secondary',
        
        'border-2 border-orange-600 text-orange-600 hover:bg-orange-50': variant === 'outline',
        
        'px-4 py-2 text-sm': size === 'sm',
        'px-6 py-2 text-base': size === 'md',
        'px-8 py-3 text-lg': size === 'lg',
        
        // State
        'opacity-50 cursor-not-allowed': disabled || loading
      }
    ]"
  >
    <span v-if="loading" class="mr-2 animate-spin">⏳</span>
    <slot />
  </button>
</template>