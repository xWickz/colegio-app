<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const items = ref([])

// campos para POST
const cedula = ref([])
const nombre = ref([])

const fetchData = async() => {
  try {
    const response = await axios.get('http://localhost:3000/api/data')
    items.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const addEstudiante = async () => {
  if (!cedula.value || !nombre.value) return alert('Llena ambos campos')

  try {
    await axios.post('http://localhost:3000/api/data', {
      cedula: cedula.value,
      nombre: nombre.value
    });

    cedula.value = ''
    nombre.value = ''

    fetchData()

  } catch (error) {
    console.error(error)
    alert('Ocurrio un error!')
  }
}

const deleteStudent = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/data/${id}`)
    fetchData()
  } catch (error) {
    console.error(error)
    alert('Error')
  }
}


onMounted(() => {
  fetchData()
})

</script>

<template>
    <main>
        <div>
          <h1>Estudiantes:</h1>
          <ul>
            <li v-for="estudiante in items" :key="estudiante.id">
              {{ estudiante.id }}: ({{ estudiante.cedula }}) {{ estudiante.nombre }}
              <button @click="deleteStudent(estudiante.id)">Eliminar</button>
            </li>
          </ul>
        </div>
      
        <div>
          <h1>Agregar estudiante:</h1>
          <input type="text" v-model="cedula" placeholder="Cedula"/>
          <input type="text" v-model="nombre" placeholder="Nombre"/>
          <button @click="addEstudiante">Agregar</button>
        </div>
    </main>
</template>