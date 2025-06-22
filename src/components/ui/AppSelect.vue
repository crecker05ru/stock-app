<template>
  <div class="app-select" @click.stop="buttonClick">
    <button class="app-select__window">
      <template v-if="selectedOption">
        <span v-if="!props.optionKeyField">{{
          props.optionNameField ? selectedOption?.[props.optionNameField] : selectedOption
        }}</span>
        <span v-else>{{ selectedOption }}</span>
      </template>

      <span class="app-select__placeholder" v-if="props?.placeholder && !selectedOption">{{
        props?.placeholder
      }}</span>
      <IconArrowSelect
        :class="['app-select__icon', { 'app-select__icon_active': isDropdownOpened }]"
      />
    </button>
    <ul
      v-if="props?.options?.length"
      :class="[
        'app-select__dropdown-list',
        { 'app-select__dropdown-list_active': isDropdownOpened },
      ]"
    >
      <li
        class="app-select__dropdown-item"
        v-for="(option, index) in props?.options"
        :key="index"
        @click.stop="selectOption(option)"
      >
        {{ props.optionNameField ? option?.[props.optionNameField] : option }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineProps, toRef, ref } from 'vue'
import IconArrowSelect from '@/components/icons/IconArrowSelect.vue'

const emit = defineEmits<{
  buttonClick: [value: void]
  'update:modelValue': [value: object | undefined]
}>()
const props = defineProps<{
  modelValue?: object | string | number
  label?: string
  placeholder?: string
  options?: object | []
  optionNameField?: object[keyof object]
  optionKeyField?: object[keyof object]
}>()
const selectedOption = toRef<object | undefined>(props?.modelValue)
const isDropdownOpened = ref<boolean>(false)
function buttonClick() {
  isDropdownOpened.value = !isDropdownOpened.value
  emit('buttonClick')
}

function selectOption(option: object) {
  if (props?.optionKeyField) {
    selectedOption.value = option?.[props?.optionKeyField]
  } else {
    selectedOption.value = option
  }
  console.log('selectedOption.value', selectedOption.value)
  emit('update:modelValue', selectedOption.value)
  isDropdownOpened.value = false
}

console.log('props', props)
</script>
<style lang="scss" scoped>
.app-select {
  position: relative;
  height: 48px;
  min-width: 120px;
  // max-width: 100%;
  border: 1px solid var(--border-color-block);
  border-radius: var(--border-radius-button);
  background-color: var(--background-color-item);
  // box-shadow: var(--box-shadow-button);
  &__window {
    border-radius: var(--border-radius-button);
    background-color: var(--background-color-item);
  }
  &__icon {
    position: absolute;
    right: 12px;
    top: 12px;
    cursor: pointer;
    color: var(--color-text-button);
    transition: transform 200ms;
    &_active {
      transform: rotate(-90deg);
    }
  }
  &__placeholder {
    color: var(--color-text-button);
  }
  &__dropdown-list {
    display: none;
    position: absolute;
    // padding: 20px 0px;
    left: 0;
    top: calc(100% + 0.1rem);
    width: 100%;
    height: 180px;
    overflow-y: auto;
    z-index: +33;
    border-radius: var(--border-radius-button);
    background-color: var(--background-color-item);
    box-shadow: var(--box-shadow-button);
    scrollbar-width: none;
    &_active {
      display: block;
    }
  }
  &__dropdown-item {
    padding: 10px 20px 2px;
    height: 42px;
    border-bottom: 1px solid var(--border-color-block);
    cursor: pointer;
    &:not(:last-child) {
      border-radius: var(--border-radius-item);
      background-color: var(--background-color-item);
    }
    &:hover {
      background-color: var(--background-color-item-hover);
    }
  }
}
</style>
