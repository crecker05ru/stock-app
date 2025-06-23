import { ref, nextTick, computed, onMounted } from 'vue'
import api from '@/api'

interface fetchData {
  selector: string
  path: string
  target: HTMLElement
}
export function useIntersectionObserver(data: fetchData) {
  const observer = ref(null)
  const element = ref(data?.target)
  const isElementIntersecting = ref(false)
  const fetchedData = ref()
  const fetchedComputedData = computed(() => fetchedData.value)
  const promise = new Promise(async (resolve, reject) => {
    try {
      const res = await api.get(data.path)
      let json = null
      if (res) {
        json = res
        resolve(json)
      }
    } catch (e) {
      console.log('Intersection error', e)
      reject(e)
    }
  })

  const observerCallback = function (entries, observer) {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      observer.unobserve(element.value)
    }
  }

  const fetchMore = (data) => {
    promise.then((res) => {
      fetchedData.value = res

      nextTick(() => {
        element.value = document.querySelector(data.selector)
        observer.value = new IntersectionObserver(observerCallback, {
          threshold: 0.5,
        })
        if (element.value) observer.value.observe(element.value)
      })
    })
  }

  onMounted(() => {
    nextTick(() => {
      if (!element.value) {
        element.value = document.querySelector(data.selector)
      }
      observer.value = new IntersectionObserver(observerCallback, {
        threshold: 0.5,
      })
      if (element.value) observer.value.observe(element.value)
    })
  })

  return {
    observer,
    element,
    isElementIntersecting,
  }
}
