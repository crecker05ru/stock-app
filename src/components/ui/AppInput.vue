<template>
  <div class="app-input">
    <span class="app-input__label">{{ props?.label }}</span>
    <span class="app-input__search-icon" v-if="props?.isSearch"></span>
    <input
      class="app-input__input"
      :placeholder="props?.placeholder"
      :type="props?.type"
      @change="inputChange"
      @input="onInput"
      v-model="modelValue"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted, watch } from 'vue'
const $emit = defineEmits<{
  inputChange: [value: Event]
  change: [value: string | number]
  'update:modelValue': [value: string | number]
}>()

const modelValue = defineModel()
const props = defineProps<{
  label?: string
  placeholder?: string
  type?: string
  isSearch?: boolean
  // modelValue?: string | number
}>()

const inputValue = ref('')
function inputChange(event: Event) {
  const value = (event?.target as HTMLInputElement)?.value
  $emit('inputChange', event)
  $emit('update:modelValue', value)
}

function onInput(event: Event) {
  const value = (event?.target as HTMLInputElement)?.value
  $emit('update:modelValue', value)
  $emit('change', value)
}
// watch(
//   () => props.modelValue,
//   () => {
//     inputValue.value = props.modelValue
//   },
// )
onMounted(() => {
  // inputValue.value = props.modelValue
})
</script>
<style lang="scss" scoped>
.app-input {
  // min-width: 120px;
  // min-height: 52px;
  &__input {
    // height: 100%;
    min-height: 52px;
    min-width: 120px;
    width: 100%;
    padding-left: 20px;
    outline: none;
    border: 1px solid var(--border-color-block);
    font-size: 16px;
  }
}
</style>
