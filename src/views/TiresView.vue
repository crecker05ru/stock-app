<template>
  <div class="home">
    <div class="home__filters">
      <FilterBlock class="home__filter" v-model="tiresFiltersData" />
    </div>
    <div class="home__banners"></div>
    <section class="home__section">
      <h2 class="home__section-title">Популярные шины</h2>
      <p class="home__section-label">Смотреть все</p>
      <div class="home__section-list" v-if="tiresList?.length">
        <StockItem
          v-for="(item, index) in tiresList"
          :key="index"
          :data="item"
          @click="$router.push(`tires/${index}`)"
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
  height: '',
  diametr: '',
  manufactor: '',
  season: '',
  outerDiametr: '',
  options: [],
})

const tiresList = ref([{ name: '', count: 0, price: 0 }])

async function getTires() {
  console.log('getTires')
  try {
    const response = await fetch('http://localhost:3000/exceldatabase')
    const body = await response.json()
    tiresList.value = body
  } catch (e) {
    console.log(e)
  }
}

// await getTires()
// getTires()

onMounted(() => {
  console.log('onMounted', onMounted)
  getTires()
})
</script>
<style lang="scss" scoped>
.home {
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
}

.category-item--height_double {
  grid-row: span 2;
  flex-direction: column;
}
</style>
