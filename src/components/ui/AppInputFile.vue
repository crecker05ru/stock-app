<template>
  <div class="app-input">
    <label class="app-input__wrapper">
      <span class="app-input__label">{{ props?.label || 'Выбрать файл' }}</span>
      <input
        class="app-input__input"
        :placeholder="props?.placeholder"
        :accept="props?.accept"
        type="file"
        @change="changeFile"
        @input="onInput"
      />
    </label>
    <p v-if="props?.isError" class="app-input__input_error">{{ props?.errorMessage }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
const emit = defineEmits<{
  inputChange: [value: Event]
  'update:modelValue': [value: unknown]
  changeFile: [value: unknown]
  deleteFile: [value: string]
}>()

const modelValue = defineModel()
const props = defineProps<{
  label?: string
  placeholder?: string
  accept?: string
  id: string
  isError: string
  errorMessage: string
}>()

const selectedFile = ref<File | null>(null)
function inputChange(event: Event) {
  const value = (event?.target as HTMLInputElement)?.value
  emit('inputChange', event)
  emit('update:modelValue', value)
}

function onInput(event: Event) {
  const value = (event?.target as HTMLInputElement)?.value
  emit('update:modelValue', value)
}

const changeFile = (e: Event) => {
  emit('changeFile', e)
  const target = e.target as EventTarget
  const files = (target as HTMLInputElement).files
  const file = files?.[0]
  selectedFile.value = file as File
  emit('update:modelValue', selectedFile.value)
}

const deleteFile = () => {
  emit('deleteFile', props?.id)
}

const previewFile = () => {
  if (typeof props?.modelValue === 'string') {
    const viewFileURL = props?.modelValue
    const link = document.createElement('a')
    link.setAttribute('type', '_blank')
    link.href = `${viewFileURL}`
    link.click()
    link.remove()
  } else {
    const viewFileURL = URL.createObjectURL(props?.modelValue)
    const link = document.createElement('a')
    link.setAttribute('type', '_blank')
    link.href = `${viewFileURL}`
    link.click()
    link.remove()
  }
}
</script>
<style lang="scss" scoped>
.app-input {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 120px;
    padding: 12px 8px;
    background-color: var(--item-main-color);
    // min-height: 52px;
    // min-width: 120px;
    width: 100%;
    border-radius: var(--border-radius-button);
    cursor: pointer;
  }
  &__label {
    font-size: 16px;
    font-weight: 500;
  }

  &__input {
    // min-height: 52px;
    // min-width: 120px;
    // width: 100%;
    // padding-left: 20px;
    // outline: none;
    // border: 1px solid var(--border-color-block);
    // font-size: 16px;
    // appearance: none;
    // opacity: 0;
    visibility: hidden;
    display: inline-block;
    outline: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    appearance: none;
    cursor: pointer;
  }
}
</style>
