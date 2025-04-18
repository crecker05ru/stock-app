<template>
  <label class="app-checkbox">
    <input
      :class="['app-checkbox__input', { 'app-checkbox__input_checked': isChecked }]"
      :placeholder="props?.placeholder"
      type="checkbox"
      :name="props?.name"
      :value="props?.value"
      @change="inputChange"
      @input="onInput"
      v-model="inputValue"
    />
    <span class="app-checkbox__label">{{ props?.label }}</span>
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
  value?: string | number
  isSearch?: boolean
  modelValue?: string | []
}>()

const inputValue = toRef<string | []>(props?.modelValue)
const isChecked = computed(() => props?.value === inputValue.value)
function inputChange(event: Event) {
  const value = (event?.target as HTMLInputElement)?.value
  console.log('inputChange value', value)
  console.log('inputChange inputValue.value', inputValue.value)
  $emit('inputChange', event)
  $emit('update:modelValue', value)
}

function onInput(event: Event) {
  const value = (event?.target as HTMLInputElement)?.value
  $emit('update:modelValue', value)
}
watch(
  () => props.modelValue,
  () => {
    inputValue.value = props.modelValue
  },
)
onMounted(() => {
  // inputValue.value = props.modelValue
})
</script>
<style lang="scss" scoped>
.app-checkbox {
  position: relative;
  display: flex;
  color: var(--color-text-button);
  cursor: pointer;
  & .app-checkbox__input:checked {
    background-color: var(--item-main-color);
  }
  & .app-checkbox__input:checked::after {
    display: block;
    content: '';
    flex-shrink: 0;
    top: 0px;
    left: 0px;
    width: 10px;
    height: 10px;
    margin: 5px;
    background-color: var(--background-color-checked);
    border-radius: var(--border-radius-checkbox);
  }
  & .app-checkbox__input:checked + span {
    color: var(--color-text-main);
  }
  & span {
    margin-left: 10px;
    user-select: none;
  }
  &__input {
    display: block;
    width: 21px;
    height: 22px;
    flex-shrink: 0;
    outline: none;
    border: 1px solid var(--border-color-block);
    border-radius: var(--border-radius-checkbox);
    font-size: 15px;
    appearance: none;
  }
}
</style>
