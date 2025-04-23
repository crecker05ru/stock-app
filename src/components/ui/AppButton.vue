<template>
  <div class="app-button__button-wrapper">
    <button
      :class="['app-button__button', { 'app-button__button--wrapper': $props?.isWrapper }]"
      @click="buttonClick"
    >
      <slot>
        <span class="app-button__button-text" v-if="$props?.label">{{ $props?.label }}</span></slot
      >
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
  isWrapper?: boolean
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
    &--wrapper {
      padding-top: 5px;
      width: 39px;
      height: 39px;
      border: var(--border-button);
      border-radius: 50%;
      background-color: var(--background-color-button-second-translate);
      box-shadow: none;
      border-color: var(--background-color-button-second);
      text-align: center;
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
