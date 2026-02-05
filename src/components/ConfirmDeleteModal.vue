<template>
    <div v-if="visible"
        class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/10"
        @click.outside="emitCancel">
        <div class="relative p-4 w-full max-w-md max-h-full" @click.stop>
            <div class="relative bg-white dark:bg-dark-backdrop border border-default rounded-base shadow-sm p-6">
                <h3 class="text-lg font-medium text-heading mb-4">
                    ¿Eliminar estudiante?
                </h3>
                <p class="mb-6 text-body">
                    ¿Estás seguro de que deseas eliminar a <strong>{{ student?.nombre }}</strong>?
                    Esta acción no se puede deshacer.
                </p>
                <div class="flex justify-end gap-3">
                    <button @click="emitCancel" type="button"
                        class="px-4 py-2 rounded-base bg-neutral-secondary-medium text-body hover:bg-neutral-tertiary-medium">
                        Cancelar
                    </button>
                    <button @click="emitConfirm" type="button"
                        class="px-4 py-2 rounded-base bg-red-600 text-white hover:bg-red-700">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    visible: Boolean,
    student: Object 
})

const emit = defineEmits(['cancel', 'confirm'])
function emitCancel() { emit('cancel') }
function emitConfirm() { emit('confirm') }
</script>