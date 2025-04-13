<template>
  <div class="home">
    <div class="home__filters">
      <FilterBlock class="home__filter" />
    </div>
    <div class="home__banners"></div>
    <div class="home__categories">
      <div class="home__category-item">Шины</div>
      <div class="home__category-item category-item_height_double">Мотошины</div>
      <div class="home__category-item category-item_height_double">Грузовые</div>
      <div class="home__category-item">Диски</div>
    </div>
    <section class="home__section">
      <h2 class="home__section-title">Популярные шины</h2>
      <p class="home__section-label">Смотреть все</p>
      <div class="home__section-list">
        <!-- <div class="home__section-item item">
          <div class="item__seasons"></div>
          <div class="item__head-buttons"></div>
          <div class="item__image-wrapper">
            <img class="item__image" src="@/assets/images/items/yokohoma_bluearth.png" />
          </div>
          <div class="item__rating"><span>4.84</span></div>
          <div class="item__prices"><span>2 500</span></div>
          <div class="item__description">Yokohama BluEarth *Winter V905 205 45 R17 88V</div>
          <div class="item__footer">
            <div class="item__footer-count"></div>
            <button>В корзину</button>
          </div>
        </div> -->
        <StockItem v-for="(item, index) in stockItems" :key="index" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import FilterBlock from '../components/FIlterBlock.vue'
import StockItem from '@/components/ui/StockItem.vue'

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
    background-color: var(--item-main-color);
    border-radius: var(--border-radius-button);
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

.category-item_height_double {
  grid-row: span 2;
}
</style>
