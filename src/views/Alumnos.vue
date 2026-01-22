<script setup>
import Navbar from '../components/Navbar.vue'

import axios from 'axios'
import { ref, onMounted } from 'vue'

const items = ref([])

// campos para POST
const cedula = ref([])
const nombre = ref([])

const fetchData = async() => {
  try {
    const response = await axios.get('http://localhost:3000/api/data/estudiantes')
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
        console.error(error.request.response)
        alert(error.request?.response || "Error inesperado")

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

    <Navbar/>
    <main class="bg-gray-800 min-h-screen p-10 text-white"> 
      
        <div class="mt-20">
          <h1>Estudiantes:</h1>

          <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table class="w-full text-sm text-left rtl:text-right text-body">
            <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
              <tr>
                <th scope="col" class="px-6 py-3 font-medium">Cedula</th>
                <th scope="col" class="px-6 py-3 font-medium">Nombre</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="estudiante in items" :key="estudiante.id" class="bg-neutral-primary border-b border-default">
                <th>V-{{ new Intl.NumberFormat('es-ES').format(estudiante.cedula) }}</th>
                <td>{{ estudiante.nombre }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <table class="table-auto w-full border-collapse">
  <thead>
    <tr class="bg-gray-900">
      <th class="px-4 py-2 text-left">Name</th>
      <th class="px-4 py-2 text-left">Job</th>
      <th class="px-4 py-2 text-left">Employed</th>
    </tr>
  </thead>
  <tbody>
    <tr class="hover:bg-gray-700">
      <td class="border px-4 py-2">John Michael</td>
      <td class="border px-4 py-2">Manager</td>
      <td class="border px-4 py-2">23/04/18</td>
    </tr>
    <tr class="hover:bg-gray-700">
      <td class="border px-4 py-2">Alexa Liras</td>
      <td class="border px-4 py-2">Developer</td>
      <td class="border px-4 py-2">23/04/18</td>
    </tr>
    <!-- Additional rows... -->
  </tbody>
</table>

        <div>
          <h1>Agregar estudiante:</h1>
          <input type="number" v-model="cedula" placeholder="Cedula"/>
          <input type="text" v-model="nombre" placeholder="Nombre"/>
          <button @click="addEstudiante">Agregar</button>
        </div>
    </main>
</template>