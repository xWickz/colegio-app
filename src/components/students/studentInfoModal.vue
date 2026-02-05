<template>
  <div
    v-if="visible"
    class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/10"
    @click.outside="emitClose"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full" @click.stop>
      <div class="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
        <div class="flex items-center justify-between border-b border-default pb-4 md:pb-5">
          <h3 class="text-lg font-medium text-heading">
            Información del estudiante
          </h3>
          <button type="button"
            class="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
            @click="emitClose">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
            <span class="sr-only">Cerrar modal</span>
          </button>
        </div>
        <div class="space-y-4 md:space-y-6 py-4 md:py-6">
          <p class="leading-relaxed text-body">
            <strong>Nombre:</strong> {{ student?.nombre }}
          </p>
          <p class="leading-relaxed text-body">
            <strong>Cédula:</strong> V-{{ formatCedula(student?.cedula) }}
          </p>
          <div>
            <strong>Materias asignadas:</strong>
            <div v-if="loadingMaterias" class="text-sm text-body">Cargando materias...</div>
            <ul v-else-if="materias.length > 0" class="list-disc list-inside mt-1">
              <li v-for="materia in materias" :key="materia.id">{{ materia.materia_nombre }}</li>
            </ul>
            <div v-else class="text-sm text-body">Sin materias asignadas</div>
          </div>
        </div>
        <div class="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
          <button @click="emitClose" type="button"
            class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  visible: Boolean,
  student: Object,
  materias: Array,
  loadingMaterias: Boolean
})
const emit = defineEmits(['close'])
function emitClose() {
  emit('close')
}
function formatCedula(cedula) {
  return new Intl.NumberFormat('es-ES').format(cedula)
}
</script>