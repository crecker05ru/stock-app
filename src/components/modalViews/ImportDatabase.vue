<template>
  <div class="import-database">
    <p class="import-database__title">Импортировать БД</p>
    <div class="import-database__inputs">
      <AppInputFile v-model="file" accept=".xls, .xlsx, .csv" />
    </div>
    <AppButton class="import-database__submit" @click="submit" :isLoading="isLoading"
      >Импортировать</AppButton
    >
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import AppInputFile from '@/components/ui/AppInputFile.vue'
import AppButton from '@/components/ui/AppButton.vue'

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

async function submit() {
  console.log('productForm', productForm)
  try {
    const formData = new FormData()
    formData.append('file', file.value)
    const response = await fetch('http://localhost:3000/exceldatabase/headers', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
    console.log('response', response)
    if (response?.ok) {
      const body = await response.json()
      headers.value = body
      console.log('fetchTableHeaders body', body)
      // console.log(Object.keys(body))
    }
  } catch (e) {
    console.log(e)
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
    margin-left: auto;
  }
}
</style>
