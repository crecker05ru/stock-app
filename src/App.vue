<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
// import AppFooter from '@/components/AppFooter.vue'
import ModalBody from '@/components/ModalBody.vue'

//Асинхронная загрузка компоненты внутри родителя
const AsyncFooterComponent = defineAsyncComponent(() => import('@/components/AppFooter.vue'))
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
