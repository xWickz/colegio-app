<template>
  <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between p-4" aria-label="Table navigation">
    <span class="text-sm font-normal text-body mb-4 md:mb-0 block w-full md:inline md:w-auto">
      Mostrando
      <span class="font-semibold text-heading">{{ start }}-{{ end }}</span>
      de <span class="font-semibold text-heading">{{ studentsCount }}</span>
    </span>
    <ul class="flex -space-x-px text-sm">
      <li>
        <button @click="$emit('prev')" :disabled="page === 1" href="#"
          :class="['flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none', page === totalPages ? 'text-fg-disabled bg-disabled focus:outline-none' : 'hover:bg-neutral-tertiary-medium hover:text-heading']">
          Previo
        </button>
      </li>
      <li v-for="n in totalPages" :key="n">
        <a @click="$emit('go', n)" href="#"
          :class="['flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none', page === n ? 'text-fg-brand' : '']"
          :aria-current="page === n ? 'page' : null">{{ n }}</a>
      </li>
      <li>
        <button @click="$emit('next')" :disabled="page === totalPages" href="#"
          :class="['flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium font-medium rounded-e-base text-sm px-3 h-9 focus:outline-none', page === totalPages ? 'text-fg-disabled bg-disabled focus:outline-none' : 'hover:bg-neutral-tertiary-medium hover:text-heading']"
          type="button">Siguiente</button>
      </li>
    </ul>
  </nav>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  page: Number,
  limit: Number,
  totalPages: Number,
  studentsCount: Number
})
const start = computed(() => (props.page - 1) * props.limit + 1)
const end = computed(() => Math.min(props.page * props.limit, props.studentsCount))
</script>