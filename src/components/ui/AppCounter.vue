<template>
  <div class="app-counter">
    <button
      :class="[
        'app-counter__button app-counter__button--minus',
        { 'app-counter__button--disabled': counter === 0 },
      ]"
      @click="decreaseCount"
    >
      <IconMinus />
    </button>
    <label class="app-counter__label">
      <input class="app-counter__input" :value="counter" type="number" />
    </label>
    <button
      :class="[
        'app-counter__button app-counter__button--plus',
        { 'app-counter__button--disabled': counter >= maxCount },
      ]"
      @click="addCount"
    >
      <IconPlus />
    </button>
  </div>
</template>
<script setup lang="ts">
import IconMinus from '../icons/IconMinus.vue'
import IconPlus from '../icons/IconPlus.vue'
// import { ref } from 'vue';
// import { $ref } from 'vue/macros'

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const { modelValue = 0, maxCount = 999 } = defineProps({
  modelValue: { type: Number, required: true },
  maxCount: { type: Number, required: false },
})

let counter = $ref<number>(modelValue)

function addCount() {
  if (counter >= maxCount) {
  } else {
    counter++
    emit('update:modelValue', counter)
  }
}

function decreaseCount() {
  if (counter > 0) {
    counter--
    emit('update:modelValue', counter)
  }
}
</script>
<style lang="scss" scoped>
.app-counter {
  display: flex;
  gap: 8px;
  align-items: center;
  &__button {
    border: none;
    background-color: transparent;
    &--disabled {
      color: var(--color-text-button);
    }
  }
  &__label {
    justify-self: flex-start;
    max-width: fit-content;
    // min-width: 29px;
    display: inline-block;
  }
  &__input {
    display: inline-block;
    padding-left: 11px;
    padding-right: 8px;
    padding-top: 2px;
    // max-width: fit-content;
    border: none;
    // min-width: 29px;
    width: 29px;
    height: 29px;
    appearance: none;
    border-radius: var(--border-radius-button);
    background-color: var(--background-color-item-hover);
    -webkit-appearance: none;
    &[type='number'] {
      -moz-appearance: textfield;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
