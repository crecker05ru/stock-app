<template>
  <div
    :class="[
      'app-button',
      { 'app-button__button-wrapper': !$slots.icon },
      { 'app-button__button-wrapper--wrapper': props?.isWrapper },
      { 'app-button__button-wrapper--icon': $slots.icon },
    ]"
  >
    <button
      v-if="!isLoading"
      :class="[
        { 'app-button__button': !$slots.icon },
        { 'app-button__button--wrapper': props?.isWrapper },
        { 'app-button__button--icon': $slots.icon },
      ]"
      @click="buttonClick"
    >
      <span
        v-if="!$slots.icon"
        :class="{ 'app-button__button-text': !props?.isWrapper && !$slots.icon }"
      >
        <slot>
          <slot name="label">{{ props?.label }}</slot></slot
        >
      </span>
      <slot name="icon"></slot>
    </button>
    <button
      v-else
      :class="[
        { 'app-button__button': !$slots.icon },
        { 'app-button__button--loading': props?.isWrapper },
      ]"
    >
      Loading
    </button>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const emit = defineEmits<{
  buttonClick: [value: void]
}>()
const props = defineProps<{
  label?: string
  isWrapper?: boolean
  isLoading?: boolean
}>()

function buttonClick() {
  emit('buttonClick')
}
</script>
<style lang="scss" scoped>
.app-button {
  --main-button-color: var(--item-main-color);
  &__button-wrapper {
    width: fit-content;
    border-radius: var(--border-radius-button);
    // background-color: var(--background-color-button-translate);
    background-color: rgb(from var(--background-color-button-translate) r g b / 0.9);
    padding-bottom: 1px;
    &--wrapper {
      background-color: var(--background-color-button-second-translate);
      padding-bottom: 1px;
    }
    &--icon {
      border-radius: var(--border-radius-button);
      // background-color: rgb(from var(--background-color-button-second-translate) r g b / 0.9);
      background-color: rgb(from var(--main-button-color) r g b / 0.8);
      // padding-bottom: 1px;

      &:active .app-button__button--icon {
        transform: translate(0px, 0px);
      }
    }
  }
  &__button {
    width: 100%;
    // max-width: fit-content;
    height: 43px;
    padding: 0;
    // padding-bottom: 2px;
    border-radius: var(--border-radius-button);
    background-color: rgba(var(--background-color-button-translate), 0.8);
    box-shadow: var(--box-shadow-button);
    &:active .app-button__button-text {
      transform: translate(0px, 0px);
    }
    &--wrapper {
      padding-top: 5px;
      width: 39px;
      height: 39px;
      border: var(--border-button);
      border-radius: 50%;
      // background-color: var(--background-color-button-second-translate);
      background-color: rgb(from var(--main-button-color) r g b / 0.9);
      box-shadow: none;
      // border-color: var(--background-color-button-second);
      border-color: rgb(from var(--main-button-color) r g b / 1);
      text-align: center;

      &:active .app-button__button-text {
        transform: translate(0px, 0px);
      }
    }

    &--icon {
      padding-bottom: 1px;
      width: 100%;
      border-radius: var(--border-radius-button);
      transform: translate(0px, -2px);
      transition: transform 100ms;
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
