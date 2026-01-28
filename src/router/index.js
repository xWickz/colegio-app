import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/views/Home.vue'
import Alumnos from '@/views/Alumnos.vue'
import Profesores from '@/views/Profesores.vue'
import Materias from '@/views/Materias.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/alumnos',
        name: 'Alumnos',
        component: Alumnos
    },
    {
        path: '/profesores',
        name: 'Profesores',
        component: Profesores
    },
    {
        path: '/materias',
        name: 'Materias',
        component: Materias
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
});