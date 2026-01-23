<script setup>
import sideNavbar from '@/components/sideNavbar.vue'
import { fetchEstudiantes, addEstudianteService, deleteEstudiante } from '@/services/estudiantesService'
import { getStudentsLength } from '@/services/queryLengths'
import { ref, onMounted } from 'vue'

const items = ref([])
const cedula = ref([])
const nombre = ref([])
const page = ref(1)
const limit = ref(10)
const studentsCount = ref(0)

const fetchData = async () => {
    try {
        items.value = await fetchEstudiantes(page.value, limit.value) // pagina, limites
    } catch (error) {
        console.error(error)
    }
}

const addEstudiante = async () => {
    if (!cedula.value || !nombre.value) return alert('Llena ambos campos')

    try {

        await addEstudianteService(cedula.value, nombre.value)
        cedula.value = ''
        nombre.value = ''
        fetchData()

        const toast = document.getElementById('toast-success')
        if (toast) {
            toast.classList.remove('hidden')
            setTimeout(() => toast.classList.add('hidden'), 3000)
        }


    } catch (error) {

        console.error(error)
        alert(error.request?.response || "Error inesperado")

    }
}

const deleteStudent = async (id) => {
    try {
        await deleteEstudiante(id)
        fetchData()
    } catch (error) {
        console.error(error)
        alert('Error')
    }
}

onMounted(async () => {
    await fetchData()
    studentsCount.value = await getStudentsLength()
})

</script>

<template>

    <sideNavbar />

    <main class="bg-gray-100 min-h-screen px-20 py-10 ml-60 mx-auto">

        <h1 class="text-4xl font-black mb-2">
            Estudiantes ({{ studentsCount }})
        </h1>
        <div id="toast-success" class="fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 mb-4 text-green-500 bg-white rounded-lg shadow hidden" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clip-rule="evenodd"></path></svg>
        </div>
        <div class="ms-3 text-sm font-normal">Estudiante añadido correctamente.</div>
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close" onclick="document.getElementById('toast-success').classList.add('hidden')">
            <span class="sr-only">Cerrar</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        </div>

        <button data-modal-target="crud-modal" data-modal-toggle="crud-modal"
            class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none mb-3"
            type="button">
            Nuevo Alumno
        </button>

        <div id="crud-modal" tabindex="-1" aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
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
                                <label for="name" class="block mb-2.5 text-sm font-medium text-heading">Nombre</label>
                                <input v-model="nombre" type="text" name="name" id="name"
                                    class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                    placeholder="Santiago" required="">
                            </div>
                            <div class="col-span-2">
                                <label for="price" class="block mb-2.5 text-sm font-medium text-heading">Cedula</label>
                                <input v-model="cedula" type="number" name="price" id="price"
                                    class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                    placeholder="12345678" required="">
                            </div>
                        </div>
                        <div class="flex items-center space-x-4 border-t border-default pt-4 md:pt-6">
                            <button @click="addEstudiante" type="submit"
                                class="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                <svg class="w-4 h-4 me-1.5 -ms-0.5" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
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

        <div class="mb-4 flex items-center gap-2">
        <label for="limit" class="font-medium">Registros por página:</label>
        <select id="limit" v-model="limit" @change="fetchData" class="px-2 py-1 rounded">
            <option :value="1">1</option>
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
        </select>
        </div>

        <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
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
                            {{ estudiante.id }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </main>
</template>