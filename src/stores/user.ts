import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userData = ref()
  async function getUserData() {}

  return { userData, getUserData }
})
