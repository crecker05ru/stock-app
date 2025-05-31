<template >
  <div class="app-frame">
    <div class="app-frame__wrapper">
    <div class="app-frame__inner">
      <iframe class="app-frame__frame" :src="source" :allow="allow" style="border: none;" loading="lazy" :width=width :height=height></iframe>
    </div>
  </div>
    <slot/>
  </div>
  </template>
  <script lang="ts" setup>
  defineProps<{
    source?: string
    width? :string
    height?: string
    allow?: string
  }>()
  defineEmits(['close-frame'])
  </script>
  <style lang="scss">
  .app-frame {
    width: 100%;


    &__frame {
    min-height: 320px;
    min-width: 680px;
    @media screen and (max-width: 780px) {
      min-height: 420px;
    min-width: 420px;
    }
    @media screen and (max-width: 460px) {
    
    min-width: 100%;
    }
    }
  }
  </style>