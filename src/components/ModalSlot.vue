<template>
  <Transition name="modal">
    <div v-if="modal?.isOpened" class="modal" :data-id="id">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <div class="modal-header__row">
              <div>Label</div>
              <div @click="close">X</div>
            </div>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            <component :is="modal?.component" v-model="modal.data" @close="close"></component>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <AppButton class="modal-footer__button" @click="close">OK</AppButton>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import AppButton from '@/components/ui/AppButton.vue'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal'
import { ref } from 'vue'

const emit = defineEmits<{
  close: [value: void]
}>()

const { show = false, id = 0 } = defineProps({
  show: Boolean,
  id: Number,
})

const modalStore = useModalStore()
// const modal = ref({})

const { modal } = storeToRefs(modalStore)

function close() {
  emit('close')
  modalStore.close()
}
</script>
<style lang="scss" scoped>
.modal {
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
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }
  &-header {
    margin-top: 0px;
    font-size: 24px;
    &__row {
      display: flex;
      justify-content: space-between;
    }
  }
  &-body {
    margin: 20px 0;
  }
  &-footer {
    &__button {
      margin-left: auto;
    }
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
