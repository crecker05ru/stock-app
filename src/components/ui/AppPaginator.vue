<template>
  <div class="app-paginator">
    <AppButton
      :class="['app-paginator__button', { 'app-paginator__button--disabled': currentPage === 1 }]"
      @click="prevPage"
      >Prev</AppButton
    >
    <div class="app-paginator__page-buttons">
      <AppButton
        :class="[
          'app-paginator__page-button',
          { 'app-paginator__page-button--active': currentPage === button },
        ]"
        v-for="(button, buttonIndex) in buttons"
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
import { computed, onMounted, ref } from 'vue'
// import { $ref } from 'vue/macros'

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const props = defineProps({
  modelValue: { type: Number, required: false },
})

const currentPage = ref(1)
const buttons = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
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
  currentPage.value = props?.modelValue || 1
})
</script>
<style lang="scss" scoped>
.app-paginator {
  display: flex;
  &__button {
    width: 46px;
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
    width: 40px;
    &--active {
      :deep(.app-button__button) {
        background-color: var(--color-item-default);
      }
    }
  }
}
</style>
