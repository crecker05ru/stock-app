<template>
  <div class="authorization">
    <div class="authorization__inputs">
      <AppInput class="authorization__input" v-model="pass" placeholder="Введите пароль" />
      <AppButton
        class="authorization__submit"
        @click="submit"
        :isLoading="isLoading"
        :isDisabled="!pass?.length"
        >Войти</AppButton
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const { data, modelValue } = defineProps<{
  data?: object
  modelValue?: object
}>()

const emit = defineEmits(['close'])
const headers = ref()
const productForm = ref({})
const fieldsNames = ref()
const pass = ref('')
const isLoading = ref(false)

function submit() {
  console.log('productForm', productForm)
  userStore.login(pass.value).then((data) => {
    if (data) {
      emit('close')
    }
  })
}
</script>
<style lang="scss" scoped>
.authorization {
  width: 720px;
  &__inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  &__input {
    flex: 1 1 auto;
    max-width: calc(50% - 16px);
  }
  &__submit {
    margin-top: 24px;
    margin-left: auto;
  }
}
</style>
