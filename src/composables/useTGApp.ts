import { WebApp } from '@grammyjs/web-app'
import { onBeforeMount, onMounted } from 'vue'

export function useTGApp() {
  onMounted(() => {
    // WebApp.ready()
  })

  onBeforeMount(() => {
    // WebApp.close()
  })
  return {
    WebApp,
  }
}
