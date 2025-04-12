<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <AppMain>
    <RouterView />
  </AppMain>
  <AppFooter />
</template>

<style scoped lang="scss"></style>
