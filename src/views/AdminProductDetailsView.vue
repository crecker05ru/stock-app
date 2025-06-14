<template>
  <div class="product">
    <section class="product-details" v-if="details">
      <div class="product-details__image-block">
        <img
          class="product-details__image-block-img"
          src="@/assets/images/items/michelin_xlee.png"
        />
      </div>
      <div class="product-details__header-block">
        <h1 class="product-details__header-block-title">
          {{ details?.name }}
        </h1>
      </div>
      <div class="product-details__reviews-block">
        <p>4 отзыва&nbsp;</p>
        <p>Вопросы и ответы (6)</p>
      </div>
      <div class="product-details__settings-block">
        <p>Сравнить</p>
        <p>В избранное</p>
      </div>
      <div class="product-details__details-block">
        <p class="product-details__characteristics">Характеристики:</p>
        <p class="product-details__field-name">
          Типоразмер: &nbsp;<span class="product-details__field-value">{{ details?.profile }}</span>
        </p>
        <p class="product-details__field-name">
          Ширина: &nbsp;<span class="product-details__field-value">{{ details?.width }}</span>
        </p>
        <p class="product-details__field-name">
          Высота: &nbsp;<span class="product-details__field-value">{{ details?.profile }}</span>
        </p>
        <p class="product-details__field-name">
          Диаметр: &nbsp;<span class="product-details__field-value">{{ details?.diametr }}</span>
        </p>
        <p class="product-details__field-name">
          Производитель: &nbsp;<span class="product-details__field-value">{{
            details?.manufactor
          }}</span>
        </p>
        <p class="product-details__field-name">
          Модель: &nbsp;<span class="product-details__field-value">{{ details?.model }}</span>
        </p>
        <p class="product-details__field-name">
          Сезон: &nbsp;<span class="product-details__field-value">{{ details?.season }}</span>
        </p>
        <p>
          Тип: &nbsp;<span class="product-details__field-value">{{ details?.type }}</span>
        </p>
        <p class="product-details__field-name">
          Индекс нагрузки: &nbsp;<span class="product-details__field-value">{{
            details?.load_index
          }}</span>
        </p>
        <p class="product-details__field-name">
          Индекс скорости: &nbsp;<span class="product-details__field-value">{{
            details?.speed_index
          }}</span>
        </p>
        <p class="product-details__field-name">
          Шипы: &nbsp;<span class="product-details__field-value">{{ details?.spikes }}</span>
        </p>
      </div>
      <div class="product-details__price-block">
        <div class="product-details__price">Цена: {{ details?.price }}</div>
        <div class="product-details__price">Количество: {{ details?.count }}</div>
        <div class="product-details__price">Рейтинг: {{ details?.rating }}</div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onActivated, onMounted, ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import FilterBlock from '../components/FilterBlock.vue'
import StockItem from '@/components/ui/StockItem.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import AppCheckboxSwitch from '@/components/ui/AppCheckboxSwitch.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const buyOptions = ref({
  fixedMountage: false,
  distantMountage: false,
  store: false,
})
const details = ref()

console.log('${route?.params?.id}', route?.params?.id)

async function fetchDetails() {
  try {
    const response = await fetch(
      `http://localhost:5180/exceldatabase/product-details/${route?.params?.id}`,
    )
    const body = await response.json()
    console.log('response', response)
    console.log('body', body)
    details.value = body?.data
  } catch (e) {
    console.log(e)
  }
}
onMounted(async () => {
  if (!details.value) await fetchDetails()
})

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
