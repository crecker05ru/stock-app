<template>
  <Transition name="modal">
    <div
      v-if="modal?.isOpened"
      class="modal"
      :data-id="modal?.component"
      @click.self="onBackgroundClick"
    >
      <div class="modal-container">
        <component :is="modal?.component" v-model="modal.data" @close="close"></component>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal.ts'

const emit = defineEmits<{
  close: [value: void]
  backgroundClick: [value: void]
}>()

const modalStore = useModalStore()

const { modal } = storeToRefs(modalStore)

function close() {
  emit('close')
  modalStore.close()
}

function onBackgroundClick() {
  emit('close')
  emit('backgroundClick')
  modalStore.close()
}
</script>
<style lang="scss" scoped>
.modal {
  padding: 16px;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  &-container {
    margin: auto;
    min-height: 120px;
    overflow-y: auto;
    scrollbar-width: none;
    padding: 24px;
    background-color: #fff;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
