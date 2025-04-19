<template>
  <label class="app-switch">
    <span :class="['app-switch__ball', { 'app-switch__ball_active': isChecked }]"></span>
    <input
      :class="['app-switch__input', { 'app-switch__input_checked': isChecked }]"
      :placeholder="props?.placeholder"
      type="checkbox"
      :name="props?.name"
      :value="props?.value"
      @change="inputChange"
      @input="onInput"
      v-model="inputValue"
    />
    <span class="app-switch__label">{{ props?.label }}</span>
  </label>
</template>
<script setup lang="ts">
import { ref, toRef, defineProps, onMounted, watch, computed } from 'vue'
const $emit = defineEmits<{
  inputChange: [value: Event]
  'update:modelValue': [value: string | []]
}>()
const props = defineProps<{
  label?: string
  placeholder?: string
  type?: string
  name?: string
  value?: string | number | boolean
  isSearch?: boolean
  modelValue?: string | boolean | []
}>()

const inputValue = toRef<string | boolean | []>(props?.modelValue)
const isChecked = computed(() => {
  if (Array.isArray(inputValue.value)) {
    return inputValue.value.includes(props?.value)
  } else if (typeof inputValue.value === 'string' || typeof inputValue.value === 'boolean') {
    return props?.value === inputValue.value
  }
  return false
})
function inputChange(event: Event) {
  const value = (event?.target as HTMLInputElement)?.value
  console.log('inputChange value', value)
  console.log('inputChange inputValue.value', inputValue.value)
  $emit('inputChange', event)
  // $emit('update:modelValue', value)
  $emit('update:modelValue', inputValue.value)
}

function onInput(event: Event) {
  // const value = (event?.target as HTMLInputElement)?.value
  // $emit('update:modelValue', value)
}
watch(
  () => props.modelValue,
  () => {
    inputValue.value = props.modelValue
    console.log('isChecked.value', isChecked.value)
  },
)
onMounted(() => {
  // inputValue.value = props.modelValue
})
</script>
<style lang="scss" scoped>
.app-switch {
  position: relative;
  // display: flex;
  padding: 5px;
  width: 42px;
  height: 25px;
  color: var(--color-text-button);
  cursor: pointer;
  & .app-switch__input_checked:checked {
    background-color: var(--item-main-color);
  }
  & .app-switch__input_checked:checked + span {
    color: var(--color-text-main);
  }

  &__ball {
    position: absolute;
    left: 5px;
    top: 5px;
    z-index: +1;
    display: block;
    flex-shrink: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid var(--border-color-block);
    background-color: var(--color-text-header);
    transition: transform 250ms;
    &_active {
      transform: translateX(100%);
      background-color: var(--color-text-main);
      border-color: var(--color-text-main);
    }
  }
  & span {
    user-select: none;
  }
  &__input {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 40px;
    height: 25px;
    flex-shrink: 0;
    outline: none;
    border: 1px solid var(--border-color-block);
    border-radius: var(--border-radius-switch);
    background-color: var(--color-item-default);
    font-size: 15px;
    appearance: none;
    cursor: pointer;
  }
}
</style>
