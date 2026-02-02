import { ref } from 'vue'

export const visible = ref(false)
export const message = ref('')
export const type = ref('info')
let timeoutId = null

export function showToast(msg, toastType = 'info', duration = 3000) {
  message.value = msg
  type.value = toastType
  visible.value = true

  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    visible.value = false
  }, duration)
}