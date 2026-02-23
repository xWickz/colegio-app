<template>
  <div
    v-if="visible"
    :class="['fixed top-5 right-5 z-50 flex sm:items-center p-4 mb-4 text-sm border-t-4 shadow transition-all duration-300', typeClass]"
    role="alert"
  >
    <span :class="['inline-flex items-center justify-center flex-shrink-0 w-4 h-4 rounded-lg', iconBgClass]">
      <!-- Icono según el tipo -->
      <svg v-if="type === 'success'" class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
      <svg v-else-if="type === 'error'" class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
      <svg v-else-if="type === 'warning'" class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
      <svg v-else-if="type === 'info'" class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
      <svg v-else class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
    </span>
    <div class="ms-3 text-sm font-normal">{{ message }}</div>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 rounded focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 shrink-0"
      :class="closeBtnClass"
      @click="hide"
      aria-label="Cerrar"
    >
      <span class="sr-only">Cerrar</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { visible, message, type } from '../services/toast.js'

function hide() {
  visible.value = false
}

const typeClass = computed(() => {
  switch (type.value) {
    case 'success':
      return 'text-fg-success-strong bg-success-soft border-success-subtle'
    case 'error':
      return 'text-fg-danger-strong bg-danger-soft border-danger-subtle'
    case 'warning':
      return 'text-fg-warning bg-warning-soft border-warning-subtle'
    case 'info':
      return 'text-fg-brand-strong bg-brand-softer border-brand-subtle'
    default:
      return 'text-heading bg-neutral-secondary-medium border-default-medium'
  }
})

const iconBgClass = computed(() => {
  switch (type.value) {
    case 'success':
      return 'bg-success-soft text-fg-success-strong'
    case 'error':
      return 'bg-danger-soft text-fg-danger-strong'
    case 'warning':
      return 'bg-warning-soft text-fg-warning'
    case 'info':
      return 'bg-brand-softer text-fg-brand-strong'
    default:
      return 'bg-neutral-secondary-medium text-heading'
  }
})

const closeBtnClass = computed(() => {
  switch (type.value) {
    case 'success':
      return 'focus:ring-success-medium hover:bg-success-medium'
    case 'error':
      return 'bg-danger-soft text-fg-danger-strong focus:ring-danger-medium hover:bg-danger-medium'
    case 'warning':
      return 'focus:ring-warning-medium hover:bg-warning-medium'
    case 'info':
      return 'focus:ring-brand-medium hover:bg-brand-soft'
    default:
      return 'focus:ring-neutral-tertiary hover:bg-neutral-tertiary-medium'
  }
})
</script>