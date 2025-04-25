<template>
  <div class="stock-item">
    <div class="stock-item__seasons"><img src="@/assets/icons/sun.png" /></div>
    <div class="stock-item__head-buttons">
      <AppButton :isWrapper="true" @click.stop="favoriteClick"><IconFavorite /></AppButton>
      <AppButton :isWrapper="true" @click.stop="settingsClick"><IconSettings /></AppButton>
    </div>
    <div class="stock-item__image-wrapper">
      <img class="stock-item__image" src="@/assets/images/items/yokohoma_bluearth.png" />
    </div>
    <div class="stock-item__rating">
      <div class="stock-item__rating-stars">
        <template v-for="star in 5" :key="star">
          <IconStarEmpty
            :class="[
              'stock-item__rating-star',
              { 'stock-item__rating-star--active': star < itemData.rating },
            ]"
          />
        </template>
      </div>
      <span>4.84</span>
    </div>
    <div class="stock-item__prices" v-if="itemData?.discount">
      <span class="stock-item__price">{{
        itemData?.price - itemData?.price * (itemData?.discount / 100)
      }}</span>
      <span class="stock-item__price stock-item__price--crossed"
        >{{ itemData?.price }}<IconCrossLine class="stock-item__price stock-item__price-cross"
      /></span>
    </div>
    <div class="stock-item__prices" v-else>
      <span class="stock-item__price">{{ itemData?.price }}</span>
    </div>
    <div class="stock-item__description">{{ itemData?.name }}</div>
    <div class="stock-item__footer">
      <div class="stock-item__footer-count"><AppCounter v-model="itemData.count" /></div>
      <AppButton label="В корзину" @click="cartClick" />
    </div>
  </div>
</template>
<script setup lang="ts">
import IconFavorite from '../icons/IconFavorite.vue'
import IconSettings from '../icons/IconSettings.vue'
import IconStarEmpty from '../icons/IconStarEmpty.vue'
import IconStarsGroup from '../icons/IconStarsGroup.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCounter from './AppCounter.vue'
import IconCrossLine from '../icons/IconCrossLine.vue'
import { onMounted, ref } from 'vue'

const emit = defineEmits<{
  'update:modelValue': [value: number]
  cartClick: [count: number]
}>()

const props = defineProps({
  modelValue: { type: Object, required: false },
  data: { type: Object, required: true },
})

const itemData = ref({
  name: '',
  season: '',
  manufactor: '',
  model: '',
  diametr: '',
  count: 0,
  discount: 20,
  price: 3200,
  discountedPrice: 2500,
  rating: 4.84,
})

function cartClick() {
  emit('cartClick', itemData.value.count)
}

function favoriteClick() {}

function settingsClick() {}
onMounted(() => {
  itemData.value = props?.data
})
</script>
<style lang="scss" scoped>
.stock-item {
  display: flex;
  position: relative;
  flex-direction: column;
  // max-width: 278px;
  padding: 16px 16px 25px;
  border: var(--border-block);
  border-color: var(--border-color-block);
  border-radius: var(--border-radius-button);

  &:hover {
    box-shadow: var(--box-shadow-item);
  }
  &__head-buttons {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 16px;
    gap: 10px;
  }
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
  &__rating {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  &__rating-star {
    color: var(--background-color-item-hover);
    &--active {
      color: var(--item-main-color);
    }
  }
  &__prices {
    display: flex;
  }
  &__price {
    font-size: 20px;
    font-weight: 700;
    &--crossed {
      display: block;
      width: fit-content;
      position: relative;
      margin-left: 12px;
      font-size: 14px;
      font-weight: 400;
      color: var(--color-text-button);
    }
  }
  &__price-cross {
    position: absolute;
    left: -6px;
    top: 10px;
  }
  &__footer {
    display: flex;
    // gap: 34px;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
