import './assets/styles/main.css'

import { createApp, defineAsyncComponent, hydrateOnIdle } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const worker = new Worker('./webWorker.js')
// const sharedWorker = new SharedWorker('./sharedWorker.js')
// const serviceWorker = import('./serviceWorker.js')
worker.postMessage({ message: 'connect webworker' })
// sharedWorker.port.postMessage('connect shared worker')

function isSharedWorkerSupported() {
  try {
    // Проверяем наличие SharedWorker и пробуем создать временный воркер
    return typeof SharedWorker === 'function' && !!new SharedWorker('data:application/javascript,')
  } catch (e) {
    return false
  }
}

if (isSharedWorkerSupported()) {
  const sharedWorker = new SharedWorker('./sharedWorker.js')
  sharedWorker.port.postMessage('connect shared worker')
} else {
  console.error('SharedWorker не поддерживается или заблокирован')
}

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
//Асинхронная загрузка компоненты глобально
const AsyncMainComponent = defineAsyncComponent({
  loader: () => import('@/components/AppMain.vue'),
  hydrate: hydrateOnIdle(/* optionally pass a max timeout */),
})
app.component('AppMain', AsyncMainComponent)
