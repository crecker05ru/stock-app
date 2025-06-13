<template>
  <div class="admin-stock">
    <!-- <Teleport to="body">
      <ModalSlot :show="showModal" @close="showModal = false">
        <template #header>
          <h3>Пользовательский заголовок</h3>
        </template>
      </ModalSlot>
    </Teleport> -->

    <!-- <div><AppEditor /></div> -->
    <AppInputFile />
    <AppButton @click="openModalImport">Импортировать БД</AppButton>
    <div class="admin-stock__filters">
      <AppButton @click="openModal">Создать продукт</AppButton>
      <AppButton @click="fetchTableHeaders">Запросить заголовки</AppButton>
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
      <AppInput
        class="admin-stock__search-input"
        placeholder="Поиск по товару"
        v-model="inputSearchValue"
        @change="debouncedInputSearch"
      />
      <ul>
        <li v-for="(fetch, index) in fetchs" :key="index">{{ fetch }}</li>
      </ul>
      <div>
        <AppTable
          class="admin-stock__table"
          :tableHeadScheme="tableHeadScheme"
          :tableItems="tableItems"
          :totalItems="totalItems || 1"
          :isClickable="true"
          @rowClick="onRowClick"
          @change="onPaginationChange"
        >
          <template #head(name)> Наименование </template>
          <template #head(profile)><div class="cell-mode_text-align_center">Размер</div></template>
          <template #head(season)>Тип</template>
          <template #head(count)>Наличие</template>
          <template #head(price)>Цена</template>
          <template #cell(0)="{ cell }"
            ><div class="cell-mode_overflow">{{ cell?.cell }}</div></template
          >
          <template #cell(1)="{ cell }"
            ><div class="cell-mode_text-align_center">{{ cell?.cell }}</div></template
          >
          <template #cell(buttons)>
            <div class="admin-stock__table-buttons">
              <AppButton class="admin-stock__table-button" :isWrapper="true"
                ><template #icon><IconShoppingCart /></template
              ></AppButton>
              <AppButton class="admin-stock__table-button admin-stock__table-button--favorite"
                ><template #icon><IconFavorite /></template
              ></AppButton>
            </div>
          </template>
        </AppTable>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import FilterBlock from '../components/FilterBlock.vue'
import StockItem from '@/components/ui/StockItem.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppInputFile from '@/components/ui/AppInputFile.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppTable from '@/components/ui/AppTable.vue'
import AppEditor from '@/components/ui/AppEditor.vue'
import IconShoppingCart from '@/components/icons/IconShoppingCart.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import ModalSlot from '@/components/ModalSlot.vue'
import CreateProduct from '@/components/modalViews/CreateProduct.vue'
import { useModalStore } from '@/stores/modal'
import { useRoute, useRouter } from 'vue-router'
import { debounce } from '@/helpers/debounce.ts'
const ImportDatabase = defineAsyncComponent(
  () => import('@/components/modalViews/ImportDatabase.vue'),
)
const modalStore = useModalStore()
const inputValue = ref<string>('')
const inputSearchValue = ref<string>('')
const fetchs = ref<[string | number]>([])
const route = useRoute()
const router = useRouter()
const showModal = ref(false)
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

const tableScheme = [
  {
    name: {
      label: 'Наименование',
    },
  },
]
const tableHeadScheme = ['name', 'profile', 'season', 'count', 'price']
// const tableShowColumns = ['name', 'size_type', 'season', 'count', 'price']
const tableItems = ref([
  {
    name: 'Viatti Strada Asimmetrico 175/70 R13 82H',
    size_type: '175/70 R13 82T',
    season: 'summer',
    count: 3,
    price: 2500,
  },
])

const totalItems = ref(0)
const selectedTableOption = ref()
const selectedOptions = ref({
  table: '',
  operation: '',
  function: '',
})
const data = ref()

function openModal() {
  modalStore.open({ component: CreateProduct, data: { tableName: 'tires' } })
}

function openModalImport() {
  modalStore.open({ component: ImportDatabase, data: {} })
}

function onInputSearchChange(value) {
  const url = new URL(window.location.href)
  url.searchParams.set('search', value)
  router.replace(url.search)
  getTires(url.search)
}

function onRowClick(row: object) {
  console.log('row', row)
  const name = row?.row?.name.replaceAll('/', '').replaceAll(' ', '')
  console.log('name', name)
  router.push(`/admin-product-details/${row?.row?.id}`)
}

const debouncedInputSearch = debounce(onInputSearchChange, 400)
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

function onPaginationChange(paginationData) {
  const url = new URL(window.location.href)

  // If your expected result is "http://foo.bar/?x=1&y=2&x=42"
  url.searchParams.set('page', paginationData.currentPage)
  url.searchParams.set('search', inputSearchValue.value)

  const params = new URLSearchParams(paginationData)
  params.set('page', paginationData.currentPage)
  const urlSearchParams = new URLSearchParams(window.location.search)
  console.log('params', params)
  console.log('route.params', route.params)
  console.log('paginationData', paginationData)
  console.log('JSON.stringify(params)', JSON.stringify(params))
  console.log('url', url)
  console.log('url.searchParams', url.searchParams)
  router.replace(url.search)
  getTires(url.search)
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

async function getTires(params) {
  console.log('getTires')
  try {
    const response = await fetch(`http://localhost:3000/exceldatabase${params ? params : ''}`)
    const body = await response.json()
    tableItems.value = body?.data
    totalItems.value = body?.total
  } catch (e) {
    console.log(e)
  }
}
async function fetchTableHeaders(tableName) {
  try {
    const response = await fetch('http://localhost:3000/exceldatabase/headers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableName: 'tires' }),
    })
    console.log('response', response)
    if (response?.ok) {
      const body = await response.json()
      console.log('fetchTableHeaders body', body)
      // console.log(Object.keys(body))
    }
  } catch (e) {
    console.log(e)
  }
}
// await getTires()
// getTires()

onMounted(() => {
  getTires()
})
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
  &__search-input {
    margin-top: 16px;
    margin-bottom: 16px;
    max-width: 50%;
  }
  &__table-buttons {
    display: flex;
    gap: 10px;
  }
  &__table-button {
    width: 39px;

    :deep(.app-button__button) {
      padding: 8px;
    }

    &--favorite {
      :deep(.app-button__button) {
        padding: 10px 8px 4px;
      }
    }
  }
}

.category-item_height_double {
  grid-row: span 2;
}
</style>
