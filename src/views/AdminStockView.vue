<template>
  <div class="admin-stock">
    <div class="admin-stock__filters">
      <!-- <FilterBlock class="admin-stock__filter" /> -->
    </div>
    <section class="admin-stock__section">
      <textarea v-if="data" :modelValue="data"></textarea>
      <span v-if="data">{{ data }}</span>
      <div class="admin-stock__section-interaction">
        <AppInput v-model="inputValue" />
        <AppButton label="Подтвердить" @click="submit" />
        <AppButton label="Exec" @click="execute" />
        <AppButton label="insert" @click="insert" />
      </div>
      <ul>
        <li v-for="(fetch, index) in fetchs" :key="index">{{ fetch }}</li>
      </ul>
      <h2 class="admin-stock__section-title">Популярные шины</h2>
      <p class="admin-stock__section-label">Смотреть все</p>
      <div class="admin-stock__section-list">
        <StockItem v-for="(item, index) in stockItems" :key="index" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import FilterBlock from '../components/FilterBlock.vue'
import StockItem from '@/components/ui/StockItem.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const inputValue = ref<string>('')
const fetchs = ref<[string | number]>([])
const stockItems = [
  {
    rating: 4.84,
    image: '',
    price: '3200',
    discount: 20,
    description: 'Yokohama BluEarth *Winter V905 205 45 R17 88V ',
    count: 1,
  },
]

const data = ref()
async function getDataFromDB() {
  // fetch('http://localhost:3000/db').then((res) => {
  //   console.log('res', res)
  //   data.value = res
  // })
  try {
    const response = await fetch('http://localhost:3000/db')
    const body = await response.json()
    data.value = body
  } catch (e) {
    console.log(e)
  }
}

async function getDataFromChinook() {
  // fetch('http://localhost:3000/db').then((res) => {
  //   console.log('res', res)
  //   data.value = res
  // })
  try {
    const response = await fetch('http://localhost:3000/chinook')
    const body = await response.json()
    data.value = body
  } catch (e) {
    console.log(e)
  }
}

function submit() {
  fetchs.value.push(inputValue.value)
  // fetch('http://localhost:3000/db').then((res) => console.log('res', res))

  fetch('http://localhost:3000/db/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value: inputValue.value }),
  }).then((res) => {
    console.log('res', res)
    getDataFromDB()
    inputValue.value = ''
  })
}

function execute() {
  fetchs.value.push(inputValue.value)
  // fetch('http://localhost:3000/db').then((res) => console.log('res', res))

  fetch('http://localhost:3000/chinook/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value: inputValue.value }),
  }).then((res) => {
    console.log('res', res)
    getDataFromChinook()
    inputValue.value = ''
  })
}

function insert() {
  fetchs.value.push(inputValue.value)
  fetch('http://localhost:3000/chinook/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value: inputValue.value }),
  }).then((res) => {
    console.log('res', res)
    getDataFromChinook()
    inputValue.value = ''
  })
}
</script>
<style lang="scss" scoped>
.admin-stock {
  &__categories {
    padding-top: 55px;
    padding-bottom: 20px;
    display: grid;
    gap: 20px;
    grid-template: repeat(2, 132px) / minmax(40%, 1fr) minmax(29%, 1fr) minmax(29%, 1fr);
  }
  &__category-item {
    background-color: var(--item-main-color);
    border-radius: var(--border-radius-button);
    cursor: pointer;
  }
  &__section-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(278px, 1fr));
    gap: 30px;
  }
  &__section-interaction {
    display: flex;
    gap: 16px;
    align-items: center;
  }
}

.category-item_height_double {
  grid-row: span 2;
}
</style>
