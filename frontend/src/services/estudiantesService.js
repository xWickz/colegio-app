import apiClient from './api'

export async function fetchEstudiantes(page = 1, limit = 10, search = '') {
    const offset = (page - 1) * limit
    const { data } = await apiClient.get('/data/estudiantes', {
        params: {
            limit,
            offset,
            search,
        },
    })
    return data
}

export async function addEstudianteService(cedula, nombre) {
    return apiClient.post('/data/estudiantes', { cedula, nombre })
}

export async function deleteEstudiante(id) {
    return apiClient.delete(`/data/estudiantes/${id}`)
}

export async function updateEstudiante(id, cedula, nombre, fecha_nacimiento, grado) {
    return apiClient.put(`/data/estudiantes/${id}`, {
        cedula,
        nombre,
        fecha_nacimiento,
        grado,
    })
}

export async function fetchEstudianteMateria(cedula) {
    const { data } = await apiClient.get(`/data/estudiantes/${cedula}/materias`)
    return data
}