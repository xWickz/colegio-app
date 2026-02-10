import axios from 'axios'

export async function fetchEstudiantes(page = 1, limit = 10, search = "") {
    const offset = (page - 1)  * limit;
    const response = await axios.get(`http://localhost:3000/api/data/estudiantes?limit=${limit}&offset=${offset}&search=${encodeURIComponent(search)}`);
    return response.data
}

export async function addEstudianteService(cedula, nombre) {
    return await axios.post('http://localhost:3000/api/data/estudiantes', { cedula, nombre })
}

export async function deleteEstudiante(id) {
    return await axios.delete(`http://localhost:3000/api/data/estudiantes/${id}`);
}

export async function updateEstudiante(id, cedula, nombre, fecha_nacimiento, grado) {
    return await axios.put(`http://localhost:3000/api/data/estudiantes/${id}`, {
        cedula,
        nombre,
        fecha_nacimiento,
        grado
    });
}

export async function fetchEstudianteMateria(cedula) {
    const response = await axios.get(`http://localhost:3000/api/data/estudiantes/${cedula}/materias`);
    return response.data;
}