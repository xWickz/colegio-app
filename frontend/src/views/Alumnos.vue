<script setup>
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
import Pagination from '@/components/Pagination.vue'
import sideNavbar from '@/components/sideNavbar.vue'
import StudentEditModal from '@/components/students/studentEditModal.vue'
import AddStudentModal from '@/components/students/AddStudentModal.vue'
import StudentInfoModal from '@/components/students/studentInfoModal.vue'
import { useDropdown } from '@/composables/useDropdown'
import { useStudentModals } from '@/composables/useStudentModals'
import { useStudentsList } from '@/composables/useStudentsList'
import { STUDENTS_GRADES } from '@/utils/students/grades'

const {
    openDropdownId,
    toggleDropdown,
    closeDropdown,
} = useDropdown()

const {
    search,
    items,
    page,
    limit,
    studentsCount,
    totalPages,
    fetchData,
    handleAddStudent,
    deleteStudent,
    handleEditSave,
    prevPage,
    nextPage,
    goToPage,
} = useStudentsList()

const {
    addModalVisible,
    selectedStudent,
    studentToEdit,
    studentToDelete,
    materias,
    loadingMaterias,
    openAddModal,
    closeAddModal,
    openInfoModal,
    closeInfoModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
} = useStudentModals()

const handleAddStudentSubmit = async (nuevoAlumno) => {
    const success = await handleAddStudent(nuevoAlumno)
    if (success) {
        closeAddModal()
    }
}

const handleEditStudentSave = async (alumnoEditado) => {
    const success = await handleEditSave(alumnoEditado)
    if (success) {
        closeEditModal()
    }
}

const handleConfirmDelete = async () => {
    await confirmDelete(deleteStudent)
}
</script>

<template>

    <sideNavbar />

    <main class="bg-gray-100 min-h-screen px-20 py-1 ml-60 mx-auto dark:bg-dark">
            <h1 class="mt-5 font-bold text-3xl mb-3 dark:text-white">
                Estudiantes ({{ studentsCount }})
            </h1>


        <div class="mb-4 flex items-center gap-2">
            <button @click="openAddModal" type="button" class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Agregar Estudiante</button>
            <label for="limit" class="font-medium dark:text-white">Registros por página:</label>
            <select id="limit" v-model="limit" @change="fetchData" class="px-2 py-1 rounded dark:text-white">
                <option :value="1">1</option>
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
            </select>
        </div>

        <AddStudentModal :visible="addModalVisible" @close="closeAddModal" @add="handleAddStudentSubmit" />

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

                        <!-- Modal de editar información de estudiante controlado por Vue -->
                        <StudentEditModal
                            :visible="!!studentToEdit"
                            :student="studentToEdit"
                            :materias="materias"
                            :loadingMaterias="loadingMaterias"
                            @close="closeEditModal"
                            @save="handleEditStudentSave"
                        />
                        <!-- Modal de información de estudiante controlado por Vue -->

                        <!-- Modal de confirmación de eliminación -->
                        <ConfirmDeleteModal
                            :visible="!!studentToDelete"
                            :student="studentToDelete"
                            @cancel="closeDeleteModal"
                            @confirm="handleConfirmDelete"/>
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
                :queryCount="studentsCount"
                @prev="prevPage"
                @next="nextPage"
                @go="goToPage"/>

        </div>

    </main>
</template>