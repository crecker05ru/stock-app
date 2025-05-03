<template>
  <Transition name="modal">
    <div v-if="show" class="modal" :data-id="id">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <AppButton class="modal-footer__button" @click="$emit('close')">OK</AppButton>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import AppButton from '@/components/ui/AppButton.vue'

const { show = false, id = 0 } = defineProps({
  show: Boolean,
  id: Number,
})
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
