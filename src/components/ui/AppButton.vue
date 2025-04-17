<template>
  <div class="app-button__button-wrapper">
    <button class="app-button__button" @click="buttonClick">
      <span class="app-button__button-text">{{ $props?.label }}</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const $emit = defineEmits<{
  buttonClick: [value: void]
}>()
const $props = defineProps<{
  label?: string
}>()

function buttonClick() {
  $emit('buttonClick')
}
</script>
<style lang="scss" scoped>
.app-button {
  &__button {
    width: 134px;
    height: 43px;
    padding: 0;
    border-radius: var(--border-radius-button);
    background-color: var(--background-color-button-translate);
    box-shadow: var(--box-shadow-button);
    &:active .tyre-filter__submit-button-text {
      transform: translate(0px, 0px);
    }
  }
  &__button-text {
    display: block;
    padding: 12px 12px;
    transform: translate(0px, -2px);
    transition: transform 100ms;
    background-color: var(--item-main-color);
    border-radius: var(--border-radius-button);
    border: var(--border-button);
    border-color: var(--border-color-button);
    // font-family: 'Manrope';
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
