import apiClient from './api'

export async function getStudentsLength() {
    const { data } = await apiClient.get('/data/estudiantes/length')
    return data.total
}

export async function getSubjectsLength() {
    const { data } = await apiClient.get('/data/materias/length')
    return data.total
}

export async function getTeachersLength() {
    const { data } = await apiClient.get('/data/profesores/length')
    return data.total
}