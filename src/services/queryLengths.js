import axios from 'axios';

export async function getStudentsLength() {
    const response = await axios.get('http://localhost:3000/api/data/estudiantes/length');
    return response.data.length;
}

export async function getSubjectsLength() {
    const response = await axios.get('http://localhost:3000/api/data/materias/length');
    return response.data.length;
}

export async function getTeachersLength() {
    const response = await axios.get('http://localhost:3000/api/data/profesores/length');
    return response.data.length;
}