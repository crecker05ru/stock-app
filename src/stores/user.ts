import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'
export const useUserStore = defineStore('user', () => {
  const userData = ref({
    name: '',
    cartItems: 0,
    favorites: 0,
    isLogged: false,
    isAuth: false,
  })

  function getProfile() {
    return new Promise((resolve, reject) => {
      api.get('/profile').then((res) => {
        userData.value.isAuth = true
        console.log('res', res)
        console.log('res?.token', res?.token)
        if (res?.token) {
          userData.value.isLogged = true
        }
        resolve({ res, success: true })
      })
    })
  }

  function login(pass: string) {
    return new Promise((resolve, reject) => {
      if (pass === '12345') {
        userData.value.isLogged = true
        api.post('/login', { pass }).then((res) => {
          console.log('res', res)
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

  return {
    userData,
    getProfile,
    login,
    updateCart,
    updateFavorite,
    getUserData,
  }
})
