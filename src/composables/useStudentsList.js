import { ref, computed, watch, onMounted } from 'vue'
import { fetchEstudiantes, addEstudianteService, deleteEstudiante, updateEstudiante } from '@/services/estudiantesService'
import { getStudentsLength } from '@/services/queryLengths'
import { showToast } from '@/services/toast'

export function useStudentsList() {
    const search = ref('')
    const items = ref([])
    const page = ref(1)
    const limit = ref(10)
    const studentsCount = ref(0)
    const totalPages = computed(() => Math.ceil(studentsCount.value / limit.value))

    let debounceTimer = null

    const handleError = (error, mensaje = 'Error inesperado') => {
        console.error(error)
        showToast(error?.request?.response || mensaje, 'error', 8000)
    }

    const fetchData = async () => {
        try {
            items.value = await fetchEstudiantes(page.value, limit.value, search.value)
        } catch (error) {
            handleError(error)
        }
    }

    const refreshStudentsCount = async () => {
        try {
            studentsCount.value = await getStudentsLength()
        } catch (error) {
            handleError(error)
        }
    }

    const handleAddStudent = async (nuevoAlumno) => {
        try {
            await addEstudianteService(
                nuevoAlumno.cedula,
                nuevoAlumno.nombre,
                nuevoAlumno.fecha_nacimiento,
                nuevoAlumno.grado,
            )
            await fetchData()
            await refreshStudentsCount()
            showToast('Estudiante agregado correctamente!', 'success')
            return true
        } catch (error) {
            handleError(error)
            return false
        }
    }

    const deleteStudent = async (id) => {
        try {
            await deleteEstudiante(id)
            await fetchData()
            showToast('Estudiante eliminado!', 'success', 5000)
            return true
        } catch (error) {
            handleError(error)
            return false
        }
    }

    const handleEditSave = async (alumnoEditado) => {
        try {
            await updateEstudiante(
                alumnoEditado.id,
                alumnoEditado.cedula,
                alumnoEditado.nombre,
                alumnoEditado.fecha_nacimiento,
                alumnoEditado.grado,
            )
            showToast('Estudiante actualizado correctamente!', 'success')
            await fetchData()
            await refreshStudentsCount()
            return true
        } catch (error) {
            handleError(error, 'Error al actualizar el estudiante')
            return false
        }
    }

    const prevPage = () => {
        if (page.value > 1) {
            page.value -= 1
            fetchData()
        }
    }

    const nextPage = () => {
        if (page.value < totalPages.value) {
            page.value += 1
            fetchData()
        }
    }

    const goToPage = (n) => {
        if (n !== page.value) {
            page.value = n
            fetchData()
        }
    }

    onMounted(async () => {
        await fetchData()
        await refreshStudentsCount()
    })

    watch([search, page, limit], () => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            fetchData()
        }, 500)
    })

    return {
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
    }
}
