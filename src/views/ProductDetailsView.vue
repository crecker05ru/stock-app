<template>
  <div class="product">
    <section class="product-details">
      <div class="product-details__image-block">
        <img src="@/assets/images/items/michelin_xlee.png" />
      </div>
      <div class="product-details__header-block">
        <h1>Шины Yokohama BluEarth*Winter V905 205 45 R17 88V Нешип</h1>
      </div>
      <div class="product-details__details-block"><p>Характеристики:</p></div>
      <div class="product-details__price-block">
        <span>2 500</span> <AppCheckboxSwitch v-model="buyOptions.fixed" :value="true" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import FilterBlock from '../components/FilterBlock.vue'
import StockItem from '@/components/ui/StockItem.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import AppCheckboxSwitch from '@/components/ui/AppCheckboxSwitch.vue'

const buyOptions = ref({
  fixed: false,
  distant: false,
})
const details = {
  rating: 4.84,
  image: '',
  price: '3200',
  discount: 20,
  description: 'Yokohama BluEarth *Winter V905 205 45 R17 88V ',
  count: 1,
}
</script>
<style lang="scss" scoped>
.details {
}
.product-details {
  display: grid;
  grid-template: 125px 360px / repeat(3, minmax(240px, 1fr));
}
</style>
