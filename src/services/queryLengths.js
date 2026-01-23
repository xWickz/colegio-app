import axios from 'axios';

export async function getStudentsLength() {
    const response = await axios.get('http://localhost:3000/api/data/estudiantes/count');
    return response.data.length;
}