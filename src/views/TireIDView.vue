<template>
  <div class="product">
    <section class="product-details">
      <div class="product-details__image-block">
        <div class="product-details__seasons"><img src="@/assets/icons/sun.png" /></div>
        <img
          class="product-details__image-block-img"
          src="@/assets/images/items/michelin_xlee.png"
        />
      </div>
      <div class="product-details__header-block">
        <h1 class="product-details__header-block-title">Шины {{ tireDetails?.name }}</h1>
      </div>
      <div class="product-details__reviews-block">
        <p>{{ tireDetails?.reviews }} отзыва&nbsp;</p>
        <p>Вопросы и ответы (6)</p>
      </div>
      <div class="product-details__settings-block">
        <p>Сравнить</p>
        <p>В избранное</p>
      </div>
      <div class="product-details__details-block">
        <p class="product-details__characteristics">Характеристики:</p>
        <p class="product-details__field-name">
          Типоразмер: &nbsp;<span class="product-details__field-value">{{
            tireDetails.size_type
          }}</span>
        </p>
        <p class="product-details__field-name">
          Ширина: &nbsp;<span class="product-details__field-value">{{ tireDetails.width }}</span>
        </p>
        <p class="product-details__field-name">
          Высота: &nbsp;<span class="product-details__field-value">{{ tireDetails.profile }}</span>
        </p>
        <p class="product-details__field-name">
          Диаметр: &nbsp;<span class="product-details__field-value">{{ tireDetails.diametr }}</span>
        </p>
        <p class="product-details__field-name">
          Производитель: &nbsp;<span class="product-details__field-value">{{
            tireDetails.manufactor
          }}</span>
        </p>
        <p class="product-details__field-name">
          Модель: &nbsp;<span class="product-details__field-value">{{ tireDetails.model }}</span>
        </p>
        <p class="product-details__field-name">
          Сезон: &nbsp;<span class="product-details__field-value">{{ tireDetails.season }}</span>
        </p>
        <p class="product-details__field-name">
          Тип: &nbsp;<span class="product-details__field-value">{{ tireDetails.type }}</span>
        </p>
        <p class="product-details__field-name">
          Индекс нагрузки: &nbsp;<span class="product-details__field-value">{{
            tireDetails.load_index
          }}</span>
        </p>
        <p class="product-details__field-name">
          Индекс скорости: &nbsp;<span class="product-details__field-value">{{
            tireDetails.speed_index
          }}</span>
        </p>
      </div>
      <div class="product-details__price-block">
        <span class="product-details__price">{{ tireDetails?.price }}</span>
        <div class="product-details__switch-row">
          <AppCheckboxSwitch v-model="buyOptions.distantMountage" :value="true" />
          <span class="product-details__switch-text">Выездной шиномонтаж&nbsp;-&nbsp;</span>
          <span class="product-details__switch-value">500</span>
        </div>
        <div class="product-details__switch-row">
          <AppCheckboxSwitch v-model="buyOptions.fixedMountage" :value="true" />
          <span class="product-details__switch-text">Стационарный шиномонтаж</span>
        </div>
        <div class="product-details__switch-row">
          <AppCheckboxSwitch v-model="buyOptions.store" :value="true" />
          <span class="product-details__switch-text">Хранение&nbsp;-&nbsp;</span>
          <span class="product-details__switch-value">1500</span>
        </div>
        <div class="product-details__switch-row">
          <div class="product-details__footer-count">
            <AppCounter v-model="tireDetails.count" />
          </div>
          <AppButton label="В корзину" @click="cartClick" />
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onActivated } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import FilterBlock from '../components/FilterBlock.vue'
import StockItem from '@/components/ui/StockItem.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import AppCheckboxSwitch from '@/components/ui/AppCheckboxSwitch.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCounter from '@/components/ui/AppCounter.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const buyOptions = ref({
  fixedMountage: false,
  distantMountage: false,
  store: false,
})
const tireDetails = ref({
  rating: 4,
  reviews: 4,
  qa: 6,
  price: 3200,
  discount: 20,
  name: '',
  count: 0,
  discountedPrice: 2500,
  size_type: '205/45 R17',
  width: 205,
  profile: 45,
  diametr: 17,
  manufactor: 'Yokohama',
  model: 'BluEarth*Winter V905',
  season: 'winter',
  type: 'light',
  load_index: 88,
  speed_index: 'V',
  image: '',
})

function cartClick() {}

async function getTire() {
  console.log('getTires')
  try {
    const response = await fetch('http://localhost:5180/exceldatabase/1')
    const body = await response.json()
    tireDetails.value = body
  } catch (e) {
    console.log(e)
  }
}

// onMounted(() => {
//   getTire()
// })

async function fetchDetails() {
  try {
    const response = await fetch(
      `http://localhost:5180/exceldatabase/product-details/${route?.params?.id}`,
    )
    const body = await response.json()
    console.log('response', response)
    console.log('body', body)
    tireDetails.value = body?.data
  } catch (e) {
    console.log(e)
  }
}

// onMounted(async () => {
//   if (!tireDetails.value) await fetchDetails()
// })

onActivated(async () => await fetchDetails())
</script>
<style lang="scss" scoped>
.details {
}
.product-details {
  display: grid;
  grid-template: 72px 38px 360px / repeat(3, minmax(240px, 1fr));
  // justify-items: center;
  // justify-items: stretch;
  &__image-block {
    // margin-right: 28px;
    // justify-content: stretch;
    align-content: center;
    // place-items: center center;
    // align-items: center;
    // align-self: center;
    // justify-items: stretch;
    // justify-self: stretch;
    grid-row: span 3;
    border: 1px solid var(--border-color-block);
    border-radius: var(--border-radius-button);
    background-color: var(--background-color-item);
  }
  &__image-block-img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  &__header-block {
    padding-left: 26px;
    grid-column: span 2;
    // grid-row: span 2;
  }
  &__header-block-title {
    font-size: 26px;
    font-weight: 500;
  }
  &__details-block {
    padding-top: 18px;
    margin-left: 28px;
    border-top: 1px solid var(--border-color-block);
    background-color: var(--background-color-item);
  }
  &__characteristics {
    font-size: 20px;
    font-weight: 700;
  }
  &__field-name {
    // display: flex;
    // justify-content: space-between;
    font-size: 15px;
    font-weight: 500;
  }
  &__field-value {
    font-size: 15px;
    color: var(--color-text-button);
  }
  &__price-block {
    padding-top: 18px;
    padding-left: 26px;
    border-top: 1px solid var(--border-color-block);
    border-left: 1px solid var(--border-color-block);
    background-color: var(--background-color-item);
  }
  &__price {
    font-size: 30px;
    font-weight: bolder;
  }
  &__reviews-block,
  &__settings-block {
    display: flex;
    font-size: 14px;
  }
  &__reviews-block {
    padding-left: 26px;
    font-size: 16px;
  }
  &__switch-row {
    display: flex;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
  &__switch-text {
    margin-left: 12px;
    text-decoration: underline;
  }
  &__switch-value {
    font-weight: bolder;
  }
}
</style>
