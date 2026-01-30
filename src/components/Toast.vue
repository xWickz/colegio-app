<template>
  <div
    v-if="visible"
    :class="[
      'fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow',
      typeClass
    ]"
    role="alert"
  >
    <div :class="['inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg', iconBgClass]">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path v-if="type === 'success'" fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
          clip-rule="evenodd"></path>
        <path v-else fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4h2v2h-2v-2zm0-8h2v6h-2V6z"
          clip-rule="evenodd"></path>
      </svg>
    </div>
    <div class="ms-3 text-sm font-normal">{{ message }}</div>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8"
      @click="hide"
      aria-label="Close"
    >
      <span class="sr-only">Cerrar</span>
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { visible, message, type } from '@/services/toast'

function hide() {
  visible.value = false
}

const typeClass = computed(() =>
  type.value === 'success'
    ? 'text-green-500 bg-white'
    : 'text-red-500 bg-white'
)
const iconBgClass = computed(() =>
  type.value === 'success'
    ? 'text-green-500 bg-green-100'
    : 'text-red-500 bg-red-100'
)
</script>