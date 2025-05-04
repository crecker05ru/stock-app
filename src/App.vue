<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppFooter from './components/AppFooter.vue'
import ModalBody from '@/components/ModalBody.vue'
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
  <AppFooter />
</template>

<style scoped lang="scss"></style>
