import { reactive } from 'vue'
export const authState = reactive({
  token: localStorage.getItem('token') || null,
})