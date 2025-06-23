<template>
  <div class="create-product">
    <p class="create-product__title">Создать продукт</p>
    <div class="create-product__inputs" v-if="headers?.length">
      <AppInput
        v-for="head in headers"
        :key="head.name"
        class="create-product__input"
        v-model="productForm[head.name]"
        :label="fieldsNames[head.name]"
      />
    </div>
    <AppButton class="create-product__submit" @click="submit" :isLoading="isLoading"
      >Создать</AppButton
    >
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { getFieldsNames } from '@/helpers/nameMaps'
import api from '@/api'

const { data, modelValue } = defineProps<{
  data?: object
  modelValue?: object
}>()
const headers = ref()
const productForm = ref({})
const fieldsNames = ref()
const input = ref('')
const isLoading = ref(false)
console.log('data', data)
console.log('modelValue', modelValue)
async function fetchTableHeaders(tableName: string) {
  try {
    const body = await api.post('/exceldatabase/headers', JSON.stringify({ tableName }))
    headers.value = body
    console.log('fetchTableHeaders body', body)
  } catch (e) {
    console.log(e)
  }
}

if (modelValue?.tableName) {
  fetchTableHeaders(modelValue?.tableName)
  fieldsNames.value = getFieldsNames(modelValue?.tableName)
  console.log('fieldsNames', fieldsNames)
}

function submit() {
  console.log('productForm', productForm)
}
</script>
<style lang="scss" scoped>
.create-product {
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
