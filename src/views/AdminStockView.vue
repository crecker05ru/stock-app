<template>
  <div class="admin-stock">
    <div class="admin-stock__filters">
      <!-- <FilterBlock class="admin-stock__filter" /> -->
    </div>
    <div class="admin-stock__selects">
      <AppSelect
        class="admin-stock__select"
        placeholder="выберите таблицу"
        :options="tableOptions"
        optionNameField="name"
        optionKeyField="name"
        v-model="selectedOptions.table"
      />
      <AppSelect
        class="admin-stock__select"
        placeholder="выберите операцию"
        :options="operationOptions"
        optionNameField="name"
        optionKeyField="name"
        v-model="selectedOptions.operation"
      />
      <AppSelect
        class="admin-stock__select"
        placeholder="выберите функцию"
        :options="functionOptions"
        optionNameField="name"
        optionKeyField="name"
        v-model="selectedOptions.function"
      />
    </div>
    <AppButton label="Подтвердить" @click="submit" />
    <div>Выбранные опции {{ selectedOptions }}</div>
    <AppButton label="Tables" @click="getTables" />
    <AppButton label="Tires" @click="getDataFromExceldatabse" />
    <section class="admin-stock__section">
      <textarea v-if="data" :modelValue="data"></textarea>
      <span v-if="data">{{ data }}</span>
      <div class="admin-stock__section-interaction">
        <AppInput v-model="inputValue" />
        <AppButton label="Exec" @click="execute" />
        <!-- <AppButton label="insert" @click="insert" /> -->
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
import AppSelect from '@/components/ui/AppSelect.vue'
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

const tableOptions = [
  {
    name: 'albums',
  },
  {
    name: 'sqlite_sequence',
  },
  {
    name: 'artists',
  },
  {
    name: 'customers',
  },
  {
    name: 'employees',
  },
  {
    name: 'genres',
  },
  {
    name: 'invoices',
  },
  {
    name: 'invoice_items',
  },
  {
    name: 'media_types',
  },
  {
    name: 'playlists',
  },
  {
    name: 'playlist_track',
  },
  { name: 'products' },
  {
    name: 'tracks',
  },
  {
    name: 'sqlite_stat1',
  },
]

//INSERT INTO products (name, price) VALUES ('Pixel 6', 499)

const operationOptions = [
  {
    name: 'INSERT',
  },
  {
    name: 'UPDATE',
  },
  {
    name: 'DELETE',
  },
  {
    name: 'GET',
  },
]

const functionOptions = [
  {
    name: 'run',
  },
  {
    name: 'get',
  },
  {
    name: 'each',
  },
  {
    name: 'exec',
  },
  {
    name: 'prepare',
  },
  {
    name: 'map',
  },
  {
    name: 'loadExtension',
  },
  {
    name: 'bind',
  },
  {
    name: 'reset',
  },
  {
    name: 'finalize',
  },
]
const selectedTableOption = ref()
const selectedOptions = ref({
  table: '',
  operation: '',
  function: '',
})
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

async function getDataFromExceldatabse() {
  try {
    const response = await fetch('http://localhost:3000/exceldatabase')
    const body = await response.json()
    data.value = body
  } catch (e) {
    console.log(e)
  }
}

function submit() {
  fetchs.value.push(inputValue.value)
  // fetch('http://localhost:3000/db').then((res) => console.log('res', res))

  // fetch('http://localhost:3000/db/run', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ value: inputValue.value }),
  // }).then((res) => {
  //   console.log('res', res)
  //   getDataFromDB()
  //   inputValue.value = ''
  // })

  const queryString: string = `/chinook/execute${selectedOptions.value.operation}`
  const sqlString: string = `SELECT * FROM ${selectedOptions.value.table}`
  console.log('sqlString', sqlString)

  if (selectedOptions.value.operation === 'GET') {
    fetch('http://localhost:3000/chinook').then((res) => {
      console.log('res', res)
      inputValue.value = ''
    })
  } else {
    fetch('http://localhost:3000/chinook/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: inputValue.value }),
    }).then((res) => {
      console.log('res', res)
      inputValue.value = ''
    })
  }
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

async function getTables() {
  // fetch('http://localhost:3000/tables', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then((res) => {
  //   console.log('res', res)
  //   getDataFromChinook()
  //   inputValue.value = ''
  // })
  try {
    const response = await fetch('http://localhost:3000/tables')
    const body = await response.json()
    data.value = body
  } catch (e) {
    console.log(e)
  }
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
  &__selects {
    display: grid;
    grid-template: auto / repeat(auto-fit, minmax(70px, 1fr));
    margin-bottom: 24px;
  }
  &__select {
    max-width: 320px;
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
