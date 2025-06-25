import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'
export const useUserStore = defineStore('user', () => {
  const userData = ref({
    name: '',
    cartItems: 0,
    favorites: 0,
    isLogged: false,
  })

  function login(pass: string) {
    if (pass === '12345') {
      userData.value.isLogged = true
    }
    return new Promise((resolve, reject) => {
      if (pass === '12345') {
        userData.value.isLogged = true
        api.post('/login', JSON.stringify({ pass })).then((res) => {
          resolve({ res, success: true })
        })
      } else {
        reject(false)
      }
    })
  }

  function updateCart(cart) {
    userData.value.cartItems = cart
  }

  function updateFavorite(favorite) {
    userData.value.favoriteItems = favorite
  }

  async function getUserData() {}

  return { userData, login, updateCart, updateFavorite, getUserData }
})
