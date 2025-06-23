<template>
  <div class="import-database">
    <p class="import-database__title">Импортировать БД</p>
    <div class="import-database__inputs">
      <AppInputFile v-model="file" accept=".xls, .xlsx, .csv" />
    </div>
    <AppButton
      class="import-database__submit"
      @click="submit"
      :isLoading="isLoading"
      :isDisabled="!file"
      >Импортировать</AppButton
    >
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import AppInputFile from '@/components/ui/AppInputFile.vue'
import AppButton from '@/components/ui/AppButton.vue'
import api from '@/api'

const { data, modelValue } = defineProps<{
  data?: object
  modelValue?: object
}>()
const headers = ref()
const productForm = ref({})
const file = ref(null)
const isLoading = ref(false)
console.log('data', data)
console.log('modelValue', modelValue)

// function onFileChange() {
//   file.value = null
// }

async function submit() {
  isLoading.value = true
  if (!file.value) return
  console.log('file.value', file.value)
  console.log('productForm', productForm)
  try {
    const formData = new FormData()
    formData.append('file', file.value)
    const body = await api.post('/import/db', formData)
    headers.value = body
    console.log('fetchTableHeaders body', body)
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}
</script>
<style lang="scss" scoped>
.import-database {
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
    // margin-left: auto;
    width: 100%;
  }
}
</style>
