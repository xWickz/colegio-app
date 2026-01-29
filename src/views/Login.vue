<script setup>
import { ref } from 'vue'
import axios from 'axios'

const usuario = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
    error.value = ''

    try { 
        const response = await axios.post('http://localhost:3000/api/login', {
            usuario: usuario.value,
            password: password.value 
        })

        localStorage.setItem('token', response.data.token)
        window.location.href = '/'
    } catch (err) {
        error.value = 'Valores incorrectos'
    }
}
</script>

<template>
  <div class="login">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <input v-model="usuario" placeholder="Usuario" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template> 

