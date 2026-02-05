<script setup>
import sideNavbar from '@/components/sideNavbar.vue'
</script>

<template>
  <sideNavbar/>
  <main class="bg-gray-100 min-h-screen px-20 py-1 ml-60 mx-auto dark:bg-dark">
    <h1 class="mt-20 font-bold text-3xl mb-3 dark:text-white">
      Panel Principal
    </h1>

    <h2 class="text-xl text-gray-700 font-semibold mb-3">Estadistica General</h2>
    
    <div class="grid grid-cols-3 gap-4">

      <div>
        <a href="#" class="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
            <h5 class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Estudiantes</h5>
            <p class="text-body">XX</p>
        </a>
      </div>
      <div>
        <a href="#" class="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
            <h5 class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Profesores</h5>
            <p class="text-body">XX</p>
        </a>
      </div>
      <div>
        <a href="#" class="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
            <h5 class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Materias</h5>
            <p class="text-body">XX</p>
        </a>
      </div>
    </div>

  </main>
</template>