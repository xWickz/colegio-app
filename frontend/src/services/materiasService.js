import apiClient from './api'

export async function fetchMaterias(page = 1, limit = 10, search = '') {
    const offset = (page - 1) * limit
    const { data } = await apiClient.get('/data/materias', {
        params: {
            limit,
            offset,
            search,
        },
    })
    return data
}

export async function addMateriaService(nombre) {
    return apiClient.post('/data/materias', { nombre })
}