import { ref } from 'vue'

export const visible = ref(false)
export const message = ref('')
export const type = ref('success')

export function showToast(msg, toastType = 'success', duration = 3000) {
  message.value = msg
  type.value = toastType
  visible.value = true
  setTimeout(() => visible.value = false, duration)
}