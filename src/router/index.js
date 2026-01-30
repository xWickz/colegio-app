import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/views/Home.vue'
import Alumnos from '@/views/Alumnos.vue'
import Profesores from '@/views/Profesores.vue'
import Materias from '@/views/Materias.vue'
import Login from '@/views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/alumnos',
        name: 'Alumnos',
        component: Alumnos,
        meta: { requiresAuth: true }
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
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else {
        next()
    }
})

export default router 