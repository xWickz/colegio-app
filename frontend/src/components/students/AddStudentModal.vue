<template>
  <div v-if="visible" class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50" @click.outside="emitClose">
    <div class="relative p-4 w-full max-w-md max-h-full" @click.stop>
      <div class="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
        <div class="flex items-center justify-between border-b border-default pb-4 md:pb-5">
          <h3 class="text-lg font-medium text-heading">Agregar Estudiante</h3>
          <button type="button" class="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" @click="emitClose">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
            <span class="sr-only">Cerrar modal</span>
          </button>
        </div>
        <form @submit.prevent="handleAdd">
          <div class="space-y-4 md:space-y-6 py-4 md:py-6">
            <div>
              <label for="nombre" class="block mb-2.5 text-sm font-medium text-heading">Nombre Completo</label>
              <input v-model="form.nombre" type="text" name="nombre" id="nombre" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Santiago" required>
            </div>
            <div>
              <label for="cedula" class="block mb-2.5 text-sm font-medium text-heading">Cédula</label>
              <input v-model="form.cedula" type="number" name="cedula" id="cedula" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="12345678" required>
            </div>
            <div>
              <label for="grado" class="block mb-2.5 text-sm font-medium text-heading">Grado/Año</label>
              <input v-model="form.grado" type="number" name="grado" id="grado" min="1" max="11" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="1" required>
            </div>
            <div>
              <label for="fechaNacimiento" class="block mb-2.5 text-sm font-medium text-heading">Fecha de Nacimiento</label>
              <input v-model="form.fecha_nacimiento" type="date" name="date" id="date" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="12345678" required>
            </div>
          </div>
          <div class="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
            <button type="button" @click="emitClose" class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Cerrar</button>
            <button type="submit" class="text-white bg-green-600 box-border border border-transparent hover:bg-green-700 focus:ring-4 focus:ring-green-300 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  visible: Boolean
})

function toISODate(fecha) {
  if (!fecha) return ''
  // Si ya está en formato YYYY-MM-DD, regresa igual
  if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha
  // Si viene en formato DD-MM-YYYY, conviértelo
  if (/^\d{2}-\d{2}-\d{4}$/.test(fecha)) {
    const [d, m, y] = fecha.split('-')
    return `${y}-${m}-${d}`
  }
  // Si viene en otro formato, intenta parsear
  const date = new Date(fecha)
  if (!isNaN(date)) {
    return date.toISOString().slice(0, 10)
  }
  return ''
}

const emit = defineEmits(['close', 'add'])
const form = ref({ nombre: '', cedula: '', fecha_nacimiento: '', grado: '' })

function emitClose() {
  emit('close')
  form.value = { nombre: '', cedula: '', fecha_nacimiento: '', grado: '' }
}

function handleAdd() {
  if (!form.value.nombre || !form.value.cedula || !form.value.fecha_nacimiento || !form.value.grado) return
  const alumno = {
    ...form.value,
    fecha_nacimiento: toISODate(form.value.fecha_nacimiento)
  }
  emit('add', alumno)
  form.value = { nombre: '', cedula: '', fecha_nacimiento: '', grado: '' }
}
</script>
