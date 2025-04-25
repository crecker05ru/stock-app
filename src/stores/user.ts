import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userData = ref({
    name: '',
    cartItems: 0,
    favorites: 0,
  })

  function updateCart(cart) {
    userData.value.cartItems = cart
  }

  function updateFavorite(favorite) {
    userData.value.favoriteItems = favorite
  }

  async function getUserData() {}

  return { userData, updateCart, updateFavorite, getUserData }
})
