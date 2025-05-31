import { ref, nextTick, computed } from 'vue'

interface fetchData {
  selector: string
  path: string
}
export function useIntersectionObserver(data: fetchData) {
  const observer = ref(null)
  const element = ref()
  const fetchedData = ref()
  const fetchedComputedData = computed(() => fetchedData.value)
  const promise = new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(data.path)
      let json = null
      if (res) {
        json = await res.json()
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
        let lastElement = null
        element.value = document.querySelector(data.selector)
        observer.value = new IntersectionObserver(observerCallback, {
          threshold: 0.5,
        })
        lastElement = element.value
        if (element.value) observer.value.observe(element.value)
      })
    })
  }
}
