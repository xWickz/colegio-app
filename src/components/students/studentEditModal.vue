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
            Información del estudiante <span class="text-sm font-black">MODO EDICION</span> 
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
            <strong>Nombre:</strong> 
            <input v-model="alumnoEdit.nombre" type="text" name="name" id="name"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Santiago" required="">
          </p>
          <p class="leading-relaxed text-body">
            <strong>Cédula:</strong>
            <input v-model="alumnoEdit.cedula" type="number" name="cedula" id="cedula"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="V-123.456.78" required="">
          </p>
          <p class="leading-relaxed text-body">
            <strong>Fecha de Nacimiento:</strong> 
            <input v-model="alumnoEdit.fecha_nacimiento" type="date" name="fechaNacimiento" id="fechaNacimiento"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Santiago" required="">
          </p>
          <p class="leading-relaxed text-body">
            <strong>Grado/Año:</strong>
            <select v-model.number="alumnoEdit.grado" name="grado" id="grado"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                required>
              <option v-for="(grado, idx) in studentsGrades" :key="idx" :value="idx">{{ grado }}</option>
            </select>
          </p>
          <div>
            <strong>Materias asignadas:</strong>
            <div v-if="loadingMaterias" class="text-sm text-body">Cargando materias...</div>
            <ul v-else-if="materias.length > 0" class="list-disc list-inside mt-1">
              <li v-for="materia in materias" :key="materia.id">{{ materia?.materia_nombre }}</li>
            </ul>
            <div v-else class="text-sm text-body">Sin materias asignadas</div>
          </div>
        </div>
        <div class="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
          <button @click="emitClose" type="button"
            class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Cerrar</button>
          <button @click="emitSave" type="button"
            class="text-white bg-green-600 box-border border border-transparent hover:bg-green-700 focus:ring-4 focus:ring-green-300 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, toRaw } from 'vue'
import { STUDENTS_GRADES as studentsGrades } from '@/utils/students/grades'
const props = defineProps({
  visible: Boolean,
  student: Object,
  materias: Array,
  loadingMaterias: Boolean
})
const emit = defineEmits(['close', 'save'])


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

const alumnoEdit = ref({
  ...props.student,
  fecha_nacimiento: toISODate(props.student?.fecha_nacimiento)
})

// Sincroniza la copia local cuando cambie el prop student
watch(() => props.student, (nuevo) => {
  alumnoEdit.value = {
    ...nuevo,
    fecha_nacimiento: toISODate(nuevo?.fecha_nacimiento)
  }
}, { immediate: true })

function emitClose() {
  emit('close')
}

function emitSave() {
  // Asegura que grado sea int
  const data = toRaw(alumnoEdit.value)
  data.grado = parseInt(data.grado)
  emit('save', data)
}

function formatCedula(cedula) {
  return new Intl.NumberFormat('es-ES').format(cedula)
}
</script>