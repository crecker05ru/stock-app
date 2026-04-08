<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
// import AppFooter from '@/components/AppFooter.vue'
import ModalBody from '@/components/ModalBody.vue'
import { useTGApp } from './composables/useTGApp'
//Асинхронная загрузка компоненты внутри родителя
const AsyncFooterComponent = defineAsyncComponent(() => import('@/components/AppFooter.vue'))

const WebApp = useTGApp()
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./serviceWorker.j', {
        scope: '/',
      })
      if (registration.installing) {
        console.log('Service worker installing')
      } else if (registration.waiting) {
        console.log('Service worker installed')
      } else if (registration.active) {
        console.log('Service worker active')
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`)
    }
  }
}

registerServiceWorker()

onMounted(() => {
  // WebApp.ready()
  console.log('WebApp ', WebApp)
})
</script>

<template>
  <AppHeader />
  <AppMain>
    <ModalBody></ModalBody>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <!-- основное содержание -->
              <component :is="Component"></component>

              <!-- состояние загрузки -->
              <template #fallback> Загрузка... </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </AppMain>
  <AsyncFooterComponent />
</template>

<style scoped lang="scss"></style>
