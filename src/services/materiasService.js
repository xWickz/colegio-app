import axios from 'axios'

export async function fetchMaterias(page = 1, limit = 10, search = "") {
    const offset = (page - 1)  * limit;
    const response = await axios.get(`http://localhost:3000/api/data/materias?limit=${limit}&offset=${offset}&search=${encodeURIComponent(search)}`);
    return response.data
}

export async function addMateriaService(nombre) {
    return await axios.post('http://localhost:3000/api/data/materias', { nombre })
}