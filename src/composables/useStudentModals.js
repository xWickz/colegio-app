import { ref } from 'vue'
import { fetchEstudianteMateria } from '@/services/estudiantesService'

export function useStudentModals() {
    const addModalVisible = ref(false)
    const selectedStudent = ref(null)
    const studentToEdit = ref(null)
    const studentToDelete = ref(null)
    const materias = ref([])
    const loadingMaterias = ref(false)

    const openAddModal = () => {
        addModalVisible.value = true
    }

    const closeAddModal = () => {
        addModalVisible.value = false
    }

    const resetMateriasState = () => {
        materias.value = []
        loadingMaterias.value = false
    }

    const loadMaterias = async (cedula) => {
        materias.value = []
        loadingMaterias.value = true
        try {
            materias.value = await fetchEstudianteMateria(cedula)
        } catch (error) {
            console.error(error)
            materias.value = []
        } finally {
            loadingMaterias.value = false
        }
    }

    const openInfoModal = async (estudiante) => {
        if (!estudiante) {
            return
        }
        selectedStudent.value = estudiante
        await loadMaterias(estudiante.cedula)
    }

    const closeInfoModal = () => {
        selectedStudent.value = null
        resetMateriasState()
    }

    const openEditModal = async (estudiante) => {
        if (!estudiante) {
            return
        }
        studentToEdit.value = estudiante
        await loadMaterias(estudiante.cedula)
    }

    const closeEditModal = () => {
        studentToEdit.value = null
        resetMateriasState()
    }

    const openDeleteModal = (estudiante) => {
        studentToDelete.value = estudiante
    }

    const closeDeleteModal = () => {
        studentToDelete.value = null
    }

    const confirmDelete = async (deleteFn) => {
        if (!studentToDelete.value || typeof deleteFn !== 'function') {
            return
        }
        const estudianteId = studentToDelete.value.id
        const success = await deleteFn(estudianteId)
        if (success) {
            closeDeleteModal()
        }
    }

    return {
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
    }
}
