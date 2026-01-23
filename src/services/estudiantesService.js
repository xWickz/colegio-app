import axios from 'axios'

export async function fetchEstudiantes() {
    const response = await axios.get('http://localhost:3000/api/data/estudiantes')
    return response.data
}

export async function addEstudianteService(cedula, nombre) {
    return await axios.post('http://localhost:3000/api/data/estudiantes', { cedula, nombre })
}

export async function deleteEstudiante(id) {
    return await axios.delete(`http://localhost:3000/api/data/estudiantes/${id}`);
}

export async function updateEstudiante(id, cedula, nombre) {
    return await axios.put(`http://localhost:3000/api/data/estudiantes/${id}`, {
            cedula: cedula.value,
            nombre: nombre.value
        });
}