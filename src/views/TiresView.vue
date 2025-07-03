<template>
  <div class="tires">
    <div class="tires__filters">
      <FilterBlock
        class="tires__filter"
        v-if="tiresFiltersOptions"
        v-model="tiresFiltersData"
        :options="tiresFiltersOptions"
        @submit="onFiltersSubmit"
      />
    </div>
    <div class="tires__banners"></div>
    <section class="tires__section">
      <h2 class="tires__section-title">Популярные шины</h2>
      <div class="tires__section-list" v-if="tiresList?.length">
        <StockItem
          class="tires__item"
          v-for="(item, index) in tiresList"
          :key="item.id"
          :data="item"
          @itemTextClick="$router.push(`tires/${item?.id}`)"
        />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import FilterBlock from '../components/FilterBlock.vue'
import StockItem from '@/components/ui/StockItem.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import api from '@/api'
import { useTiresStore } from '@/stores/tires.ts'

const tiresStore = useTiresStore()
const tiresFiltersOptions = ref(null)

const stockItems = [
  {
    rating: 4.84,
    image: '',
    price: '3200',
    discount: 20,
    description: 'Yokohama BluEarth *Winter V905 205 45 R17 88V ',
    count: 1,
  },
  {
    rating: 4.84,
    image: '',
    price: '3200',
    discount: 20,
    description: 'Yokohama BluEarth *Winter V905 205 45 R17 88V ',
    count: 1,
  },
  {
    rating: 4.84,
    image: '',
    price: '3200',
    discount: 20,
    description: 'Yokohama BluEarth *Winter V905 205 45 R17 88V ',
    count: 1,
  },
  {
    rating: 4.84,
    image: '',
    price: '3200',
    discount: 20,
    description: 'Yokohama BluEarth *Winter V905 205 45 R17 88V ',
    count: 1,
  },
  {
    rating: 4.84,
    image: '',
    price: '3200',
    discount: 20,
    description: 'Yokohama BluEarth *Winter V905 205 45 R17 88V ',
    count: 1,
  },
  {
    rating: 4.84,
    image: '',
    price: '3200',
    discount: 20,
    description: 'Yokohama BluEarth *Winter V905 205 45 R17 88V ',
    count: 1,
  },
  {
    rating: 4.84,
    image: '',
    price: '3200',
    discount: 20,
    description: 'Yokohama BluEarth *Winter V905 205 45 R17 88V ',
    count: 1,
  },
]

const tiresFiltersData = ref({
  width: '',
  profile: '',
  diametr: '',
  manufactor: '',
  season: '',
  outerDiametr: '',
  options: [],
})

const tiresList = ref()

async function getTires() {
  console.log('getTires')
  // try {
  //   const response = await fetch('http://localhost:5180/exceldatabase')
  //   const body = await response.json()
  //   tiresList.value = body?.data
  // } catch (e) {
  //   console.log(e)
  // }
  const body = await api.get('/exceldatabase')
  tiresList.value = body?.data
}

// await getTires()
// getTires()

function execute() {
  api.post('/exceldatabse/execute', { value: '' }).then((res) => {})
}

function onFiltersSubmit(data) {
  console.log('onFiltersSubmit(data)', data)
  const optionsArr = []
  for (const key in data) {
    if (data?.[key] && !Array.isArray(data?.[key])) {
      const string = `${`${key} LIKE '%${data[key]}%'`}`
      optionsArr.push(string)
    }
  }
  // const queryString = `SELECT * FROM tires WHERE ${data?.width ? `width LIKE '%${data.width}%' LIMIT 100` : ''}`
  const queryString = `SELECT * FROM tires WHERE ${optionsArr.join(' AND ')} LIMIT 100`
  api.post('/exceldatabse/executeTires', { value: queryString }).then((res) => {
    console.log('res', res)
    if (res?.products) {
      tiresList.value = res?.products
    }
  })
}

await tiresStore.getFilters().then((res) => {
  console.log('res?.data', res?.data)
  if (res?.data) {
    tiresFiltersOptions.value = {}
    for (const key in res.data) {
      tiresFiltersOptions.value[key] = res.data[key]
    }
    console.log('tiresFiltersOptions.value', tiresFiltersOptions.value)
  }
})

onMounted(() => {
  console.log('onMounted', onMounted)
  getTires()
})
</script>
<style lang="scss" scoped>
.tires {
  &__categories {
    padding-top: 55px;
    padding-bottom: 20px;
    display: grid;
    gap: 20px;
    grid-template: repeat(2, 132px) / minmax(40%, 1fr) minmax(29%, 1fr) minmax(29%, 1fr);
  }
  &__category-item {
    display: flex;
    // width: 100%;
    // justify-content: center;
    align-items: center;
    background-color: var(--item-main-color);
    border-radius: var(--border-radius-button);
    cursor: pointer;
    &_double {
      flex-direction: column;
    }
  }
  &__category-item-wrapper {
    margin-top: 32px;
    display: block;
    align-items: center;
    // flex-direction: column;
  }
  &__category-item-image {
    position: relative;
    top: -24px;
    margin-left: 20px;
    &_rims {
      position: relative;
      top: -16px;
      margin-left: 40px;
    }
    &_double {
      margin-top: auto;
      margin-bottom: 40px;
    }
    &_truck {
      margin-top: auto;
      margin-bottom: 18px;
      position: relative;
      right: -24px;
    }
  }
  &__category-item-title {
    margin-left: auto;
    display: block;
    // flex: 1 1 100%;
    font-size: 26px;
    font-weight: 500;
    line-height: 30px;
    &_double {
      font-size: 26px;
      font-weight: 500;
      line-height: 30px;
    }
  }
  &__category-item-icon {
    margin-top: 6px;
    margin-right: 96px;
    // height: 30px;
    &_double {
      position: relative;
      bottom: -10px;
    }
  }
  &__section-list {
    display: grid;
    // grid-template: repeat(auto-fill, auto) / repeat(auto-fill, auto);
    // grid-auto-flow: column;
    // grid-template-columns: repeat(auto-fill, minmax(278px, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(278px, 1fr));
    gap: 30px;
  }
  &__item {
    // cursor: pointer;
  }
}

.category-item--height_double {
  grid-row: span 2;
  flex-direction: column;
}
</style>
