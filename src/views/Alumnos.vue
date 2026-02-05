<script setup>
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
import Pagination from '@/components/Pagination.vue'
import sideNavbar from '@/components/sideNavbar.vue'
import StudentInfoModal from '@/components/students/studentInfoModal.vue'
import { fetchEstudiantes, addEstudianteService, deleteEstudiante, fetchEstudianteMateria } from '@/services/estudiantesService'
import { getStudentsLength } from '@/services/queryLengths'
import { showToast } from '@/services/toast'
import { ref, onMounted, computed, reactive } from 'vue'

const alumnoForm = reactive({
    cedula: '',
    nombre: ''
})

// Estado para dropdown de acciones
const openDropdownId = ref(null)

const toggleDropdown = (id) => {
    openDropdownId.value = openDropdownId.value === id ? null : id
}

const closeDropdown = () => {
    openDropdownId.value = null
}

const search = ref("")
const items = ref([])
const page = ref(1)
const limit = ref(10)
const studentsCount = ref(0)
const totalPages = computed(() => Math.ceil(studentsCount.value / limit.value))

// Queries
const fetchData = async () => {
    try {
        items.value = await fetchEstudiantes(page.value, limit.value, search.value) // pagina, limites
    } catch (error) {
        handleError(error)
    }
}

const addEstudiante = async () => {
    if (!alumnoForm.cedula || !alumnoForm.nombre) {
        showToast('Llena ambos campos!', 'error')
        return
    }

    try {

        await addEstudianteService(cedula.value, nombre.value)
        alumnoForm.cedula = ''
        alumnoForm.nombre = ''
        await fetchData()
        studentsCount.value = await getStudentsLength()
        showToast('Estudiante agregado correctamente!', 'success')

    } catch (error) {
        handleError(error)
    }
}

const deleteStudent = async (id) => {
    try {
        await deleteEstudiante(id)
        fetchData()
        showToast('Estudiante eliminado!', 'success', 5000)
    } catch (error) {
        handleError(error)
    }
}

function handleError(error, mensaje = 'Error inesperado') {
    console.error(error)
    showToast(error.request?.response || mensaje, 'error', 8000)
}

// Modal de información de estudiante
const selectedStudent = ref(null)
const materias = ref([])
const loadingMaterias = ref(false)

const openInfoModal = async (estudiante) => {
    selectedStudent.value = estudiante
    materias.value = []
    loadingMaterias.value = true
    try {
        materias.value = await fetchEstudianteMateria(estudiante.cedula)
    } catch (e) {
        materias.value = []
    }
    loadingMaterias.value = false
}
const closeInfoModal = () => {
    selectedStudent.value = null
    materias.value = []
}

// Modal de editar información de estudiante
const studentToEdit = ref(null)

const openEditModal = async (estudiante) => {
    studentToEdit.value = estudiante 
}

const closeEditModal = () => {
    studentToEdit.value = null 
}

// Modal para eliminar un estudiante
const studentToDelete = ref(null)

const openDeleteModal = (estudiante) => {
    studentToDelete.value = estudiante 
}

const closeDeleteModal = () => {
    studentToDelete.value = null 
}

const confirmDelete = async () => {
    if (studentToDelete.value) {
        await deleteStudent(studentToDelete.value.id)
        closeDeleteModal()
    }
}

// Pagination
const prevPage = () => {
    if (page.value > 1) {
        page.value--
        fetchData()
    }
}

const nextPage = () => {
    if (page.value < totalPages.value) {
        page.value++
        fetchData()
    }
}

const goToPage = (n) => {
    if (n !== page.value) {
        page.value = n
        fetchData()
    }
}

// a ser exportado a utils, por favor
const STUDENTS_GRADES = [
    '1er grado',
    '2do grado',
    '3er grado',
    '4to grado',
    '5to grado',
    '6to grado',
    '1er año',
    '2do año',
    '3er año',
    '4to año',
    '5to año'
];

onMounted(async () => {
    await fetchData()
    studentsCount.value = await getStudentsLength()
})

</script>

<template>

    <sideNavbar />

    <main class="bg-gray-100 dark:bg-dark min-h-screen px-20 py-10 ml-60 mx-auto">

        <h1 class="text-4xl font-black mb-2 dark:text-white">
            Estudiantes ({{ studentsCount }})
        </h1>

        <button data-modal-target="crud-modal" data-modal-toggle="crud-modal"
            class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none mb-3"
            type="button">
            Nuevo Alumno
        </button>

        <div id="crud-modal" tabindex="-1" aria-hidden="true"
            class="hidden bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                    <div class="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                        <h3 class="text-lg font-medium text-heading">
                            Añadir nuevo alumno
                        </h3>
                        <button type="button"
                            class="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                            data-modal-hide="crud-modal">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            <span class="sr-only">Cancelar</span>
                        </button>
                    </div>
                    <div class="grid gap-4 grid-cols-2 py-4 md:py-6">
                        <div class="col-span-2">
                            <label for="name" class="block mb-2.5 text-sm font-medium text-heading">Nombre
                                Completo</label>
                            <input v-model="alumnoForm.nombre" type="text" name="name" id="name"
                                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="Santiago" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="price" class="block mb-2.5 text-sm font-medium text-heading">Cedula</label>
                            <input v-model="alumnoForm.cedula" type="number" name="price" id="price"
                                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="12345678" required="">
                        </div>
                    </div>
                    <div class="flex items-center space-x-4 border-t border-default pt-4 md:pt-6">
                        <button @click="addEstudiante" type="submit"
                            class="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                            <svg class="w-4 h-4 me-1.5 -ms-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 12h14m-7 7V5" />
                            </svg>
                            Añadir
                        </button>
                        <button data-modal-hide="crud-modal" type="button"
                            class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-4 flex items-center gap-2 ">
            <label for="limit" class="font-medium dark:text-white">Registros por página:</label>
            <select id="limit" v-model="limit" @change="fetchData" class="px-2 py-1 rounded dark:text-white">
                <option :value="1">1</option>
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
            </select>
        </div>

        <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <div class="p-4">
                <label for="input-group-1" class="sr-only">Busqueda de Alumno</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" v-model="search" @input="fetchData" id="input-group-1"
                        class="block w-full max-w-96 ps-9 pe-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3  shadow-xs placeholder:text-body"
                        placeholder="Buscar alumno">
                </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-body">
                <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                    <tr>
                        <th scope="col" class="px-6 py-3 font-medium">
                            Cedula
                        </th>
                        <th scope="col" class="px-6 py-3 font-medium">
                            Nombre
                        </th>
                        <th scope="col" class="px-6 py-3 font-medium">
                            Grado
                        </th>
                        <th scope="col" class="px-6 py-3 font-medium">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="estudiante in items" :key="estudiante.id"
                        class="bg-neutral-primary border-b border-default hover:bg-neutral-secondary">
                        <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                            V-{{ new Intl.NumberFormat('es-ES').format(estudiante.cedula) }}
                        </th>
                        <td class="px-6 py-4">
                            {{ estudiante.nombre }}
                        </td>
                        <td class="px-6 py-4">
                            {{ STUDENTS_GRADES[estudiante.grado] }}
                        </td>
                        <td class="px-6 py-4">
                            <div class="relative">
                                <button :id="'accionesButton_' + estudiante.id" @click="toggleDropdown(estudiante.id)"
                                    class="inline-flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
                                    type="button">
                                    Acciones
                                    <svg class="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </button>

                                <div v-if="openDropdownId === estudiante.id"
                                    class="z-10 absolute mt-2 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-32"
                                    @click.outside="closeDropdown">
                                    <ul class="p-2 text-sm text-body font-small"
                                        :aria-labelledby="'accionesButton_' + estudiante.id">
                                        <li>
                                            <button type="button"
                                                class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                                                @click="openEditModal(estudiante)">Editar Info.</button>
                                        </li>
                                        <li>
                                            <button type="button"
                                                class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                                                @click="openInfoModal(estudiante)">Ver Info.</button>
                                        </li>
                                        <li>
                                            <button type="button"
                                                class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                                                @click="openDeleteModal(estudiante)">Eliminar</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </td>

                        <!-- Modal de información de estudiante controlado por Vue -->
                        <StudentInfoModal
                            :visible="!!selectedStudent"
                            :student="selectedStudent"
                            :materias="materias"
                            :loadingMaterias="loadingMaterias"
                            @close="closeInfoModal"/>
                        <!-- Modal de información de estudiante controlado por Vue -->

                        <!-- Modal de confirmación de eliminación -->
                        <ConfirmDeleteModal
                            :visible="!!studentToDelete"
                            :student="studentToDelete"
                            @cancel="closeDeleteModal"
                            @confirm="confirmDelete"/>
                        <!-- Modal de confirmación de eliminación -->

                    </tr>
                </tbody>
            </table>

            <div v-if="search && items.length === 0" class="flex justify-center items-center py-8">
                <span class=" text-body text-center">No se ha encontrado nada en la búsqueda.</span>
            </div>
            
            <Pagination
                :page="page"
                :limit="limit"
                :totalPages="totalPages"
                :studentsCount="studentsCount"
                @prev="prevPage"
                @next="nextPage"
                @go="goToPage"/>

        </div>

    </main>
</template>