<template>
  <div class="app-paginator">
    <AppButton
      :class="['app-paginator__button', { 'app-paginator__button--disabled': currentPage === 1 }]"
      @click="prevPage"
      >Prev</AppButton
    >
    <!-- <div class="app-paginator__page-buttons">
      <AppButton
        :class="[
          'app-paginator__page-button',
          { 'app-paginator__page-button--active app-button--active': currentPage === button },
        ]"
        v-for="(button, buttonIndex) in buttonsToView"
        :key="buttonIndex"
        @click="currentPage = button"
      >
        <template v-if="button <= 5">
          {{ button }}
        </template>
        <template
          v-else-if="
            totalPages >= 5 &&
            currentPage !== button &&
            button < buttonsToView[buttonsToView?.length - 1]
          "
        >
          ...
        </template>
        <template v-else>{{ button }}</template>
      </AppButton>
    </div> -->
    <div class="app-paginator__page-buttons">
      <AppButton
        :class="[
          'app-paginator__page-button',
          { 'app-paginator__page-button--active app-button--active': currentPage === button },
        ]"
        v-for="(button, buttonIndex) in buttonsToView"
        :key="buttonIndex"
        @click="currentPage = button"
      >
        {{ button }}
      </AppButton>
    </div>
    <AppButton
      :class="[
        'app-paginator__button',
        { 'app-paginator__button--disabled': currentPage === maxPage },
      ]"
      @click="nextPage"
      >Next</AppButton
    >
  </div>
</template>
<script setup lang="ts">
import IconMinus from '../icons/IconMinus.vue'
import IconPlus from '../icons/IconPlus.vue'
import AppButton from './AppButton.vue'
import { computed, onMounted, ref, watch } from 'vue'
// import { $ref } from 'vue/macros'

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const {
  modelValue = 1,
  totalItems = 1,
  perPage = 24,
} = defineProps({
  modelValue: { type: Number, required: false },
  totalItems: { type: Number, required: true },
  perPage: { type: Number, required: true },
})

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(totalItems / perPage))
const buttons = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))
const buttonsToView = computed(() => {
  const viewButtons = [1]
  const startIndex = currentPage.value > 3 ? currentPage.value - 3 : 1
  const endIndex = totalPages.value - 1 > startIndex + 3 ? startIndex + 3 : totalPages.value - 1
  const startIndexLimit = startIndex > totalPages.value - 4 ? totalPages.value - 4 : startIndex
  console.log('totalPages.value', totalPages.value)
  console.log('startIndex', startIndex)
  console.log('endIndex', endIndex)

  viewButtons.push(...buttons.value.slice(startIndexLimit, endIndex))
  if (viewButtons[viewButtons.length - 1] !== buttons.value[buttons.value - 1]) {
    viewButtons.push(buttons.value[buttons.value?.length - 1])
  }
  console.log('viewButtons', viewButtons)
  return viewButtons
})
console.log('buttons.value', buttons.value)
const maxPage = computed(() => buttons.value[buttons.value?.length - 1])
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

function nextPage() {
  if (currentPage.value < maxPage.value) {
    currentPage.value += 1
  }
}
onMounted(() => {
  currentPage.value = modelValue || 1
})

watch(currentPage, () => {
  console.log('watch(currentPage', currentPage.value)
})
</script>
<style lang="scss" scoped>
.app-paginator {
  display: flex;
  &__button {
    width: 56px;
    &:first-child {
      margin-right: 12px;
    }
    &:last-child {
      margin-left: 12px;
    }
    &--disabled {
      :deep(.app-button__button) {
        background-color: var(--color-text-button);
      }
    }
  }
  &__page-buttons {
    display: flex;
    gap: 8px;
  }
  &__page-button {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
    width: 48px;
    &--active {
      // :deep(.app-button) {
      //   --main-button-color: var(--background-color-item-hover);
      //   --main-button-background-color: var(--background-color-item-hover);
      // }
    }
  }
}
</style>
