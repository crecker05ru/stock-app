<template>
  <div class="stock-item">
    <div class="stock-item__seasons"></div>
    <div class="stock-item__head-buttons"></div>
    <div class="stock-item__image-wrapper">
      <img class="stock-item__image" src="@/assets/images/items/yokohoma_bluearth.png" />
    </div>
    <div class="stock-item__rating"><span>4.84</span></div>
    <div class="stock-item__prices"><span>2 500</span></div>
    <div class="stock-item__description">Yokohama BluEarth *Winter V905 205 45 R17 88V</div>
    <div class="stock-item__footer">
      <div class="stock-item__footer-count"></div>
      <AppButton label="В корзину" />
    </div>
  </div>
</template>
<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
</script>
<style lang="scss" scoped>
.stock-item {
  display: flex;
  flex-direction: column;
  // max-width: 278px;
  padding: 16px 16px 25px;
  border: var(--border-block);
  border-color: var(--border-color-block);
  border-radius: var(--border-radius-button);
  &__image-wrapper {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-left: auto;
    margin-right: auto;
    width: 123px;
    height: 155px;
  }
  &__image {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
