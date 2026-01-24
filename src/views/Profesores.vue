<script setup>
import sideNavbar from '@/components/sideNavbar.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const items = ref([])

// campos para POST
const cedula = ref([])
const nombre = ref([])

const fetchData = async() => {
  try {
    const response = await axios.get('http://localhost:3000/api/data/profesores')
    items.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const addProfesor = async () => {
    if (!cedula.value || !nombre.value) return alert('Llena ambos campos')

    try {
        await axios.post('http://localhost:3000/api/data/profesores', {
            cedula: cedula.value,
            nombre: nombre.value
        });

        cedula.value = ''
        nombre.value = ''

        fetchData()

    } catch (error) {

        console.error(error)
        console.error(error.request.response)
        alert(error.request?.response || "Error inesperado")

    }
}

const deleteProfesor = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/data/profesores/${id}`)
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
    <sideNavbar/>
    <main class="bg-gray-100 min-h-screen px-20 py-10 ml-60 mx-auto">
        <div class="mt-10">
          <h1>Profesores:</h1>
          <ul>
            
            <li v-for="profesor in items" :key="profesor.id">
              {{ profesor.id }}: (V-{{ new Intl.NumberFormat('es-ES').format(profesor.cedula) }}) {{ profesor.nombre }}
              <button @click="deleteStudent(profesor.id)">Eliminar</button>
            </li>
          </ul>
        </div>
      
        <div>
          <h1>Agregar profesor:</h1>
          <input type="number" v-model="cedula" placeholder="Cedula"/>
          <input type="text" v-model="nombre" placeholder="Nombre"/>
          <button @click="addProfesor">Agregar</button>
        </div>
    </main>
</template>