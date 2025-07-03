import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

export const useTiresStore = defineStore('tires', () => {
  const tiresData = ref({
    items: null,
    filters: null,
    total: 0,
  })

  async function getTires(params?: string, force = false) {
    if (!tiresData.value.items?.length || force) {
      return new Promise((resolve, reject) => {
        api.get(`/exceldatabase${params ? params : ''}`).then((res) => {
          if (res?.data) {
            tiresData.value.items = res?.data
            tiresData.value.total = res?.total
          }
          resolve(res)
        })
      })
    }
  }

  async function getFilters(force = false) {
    if (!tiresData.value.filters || force) {
      return new Promise((resolve, reject) => {
        api
          .post('/exceldatabase/unique_values', { tableName: 'tires' })
          .then((res) => {
            console.log('res', res)
            if (res?.data) {
              tiresData.value.filters = res.data
            }
            resolve(res)
          })
          .catch((error) => {
            console.error('getFilters', error)
          })
      })
    }
  }

  function updateCart(cart) {
    tiresData.value.cartItems = cart
  }

  function updateFavorite(favorite) {
    tiresData.value.favoriteItems = favorite
  }

  async function gettiresData() {}

  return {
    tiresData,
    getFilters,
  }
})
