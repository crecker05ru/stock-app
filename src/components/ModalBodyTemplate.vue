<template>
  <Transition name="modal-template">
    <div v-if="modal?.isOpened" class="modal-template" :data-id="id">
      <div class="modal-template-container">
        <div class="modal-template-header" v-if="isHeader">
          <slot name="header">
            <div class="modal-template-header__row">
              <div>{{ label }}</div>
              <div @click="close">X</div>
            </div>
          </slot>
        </div>
        <div class="modal-template-body">
          <slot name="body"> </slot>
        </div>
        <div class="modal-template-footer" v-if="isFooter">
          <slot name="footer">
            <AppButton class="modal-template-footer__button" @click="close">OK</AppButton>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import AppButton from '@/components/ui/AppButton.vue'
import { ref } from 'vue'

const emit = defineEmits<{
  close: [value: void]
}>()

const { label, isHeader, isFooter } = defineProps<{
  label: string
  isHeader: boolean
  isFooter: boolean
}>()

function close() {
  emit('close')
}
</script>
<style lang="scss" scoped>
.modal-template {
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

.modal-template-enter-from {
  opacity: 0;
}

.modal-template-leave-to {
  opacity: 0;
}

.modal-template-enter-from .modal-template-container,
.modal-template-leave-to .modal-template-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
