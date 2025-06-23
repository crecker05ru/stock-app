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
