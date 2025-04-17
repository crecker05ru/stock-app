<template>
  <div class="tyre-filter">
    <div class="tyre-filter__header">
      <button :class="['tyre-filter__button', { 'tyre-filter__button_active': true }]">
        Подбор шин по типоразмеру
      </button>
      <button class="tyre-filter__button">По авто</button>
    </div>

    <div class="tyre-filter__body">
      <div class="tyre-filter__selectors">
        <div class="tyre-filter__selector">Ширина</div>
        <div class="tyre-filter__selector">Высота</div>
        <div class="tyre-filter__selector">Диаметр</div>
        <div class="tyre-filter__selector">Производитель</div>
        <div class="tyre-filter__selector">Сезон</div>
        <div class="tyre-filter__selector">Вн-ий диаметр</div>
      </div>
      <div class="tyre-filter__checkboxes">
        <label class="tyre-filter__checkbox">
          <input type="checkbox" />
          <span>Спорт-пакет</span>
        </label>
        <label class="tyre-filter__checkbox">
          <input type="checkbox" />
          <span>Run Flat</span>
        </label>
        <label class="tyre-filter__checkbox">
          <input type="checkbox" />
          <span>Усыпанность (с)</span>
        </label>
      </div>
      <button class="tyre-filter__submit-button">
        <span class="tyre-filter__submit-button-text">Подобрать</span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const $props = defineProps<{
  options?: object
}>()
</script>
<style scoped lang="scss">
.tyre-filter {
  max-width: 580px;
  background-color: var(--background-color-block);
  border-radius: var(--border-radius-block);
  box-shadow: 0px 4px 1px 1px #000000aa;
  border: var(--border-block);
  border-color: var(--border-color-block);
  overflow: hidden;
  &__header {
    display: grid;
    grid-template: auto/ 60% auto;
    height: 58px;
    border-bottom: var(--border-block);
    border-color: var(--border-color-block);
  }
  &__button {
    color: var(--color-text-button);
    background-color: var(--background-color-block);
    &:hover {
      box-shadow: var(--box-shadow-button);
    }
    &_active {
      background-color: var(--item-main-color);
      color: var(--color-text-main);
    }
  }
  &__body {
    display: grid;
    grid-template: repeat(2, auto) / auto;
    padding: 20px 20px 32px 20px;
  }
  &__selectors {
    display: grid;
    grid-template: auto auto / repeat(3, auto);
    gap: 10px;
    margin-bottom: 18px;
  }
  &__selector {
    width: 172px;
    height: 48px;
    background-color: var(--background-color-item);
    border: var(--border-button);
    border-color: var(--border-color-block);
    border-radius: var(--border-radius-button);
    color: var(--color-text-button);
  }
  &__checkboxes {
    display: grid;
    grid-template: auto / repeat(3, 1fr);
    margin-bottom: 40px;
    gap: 10px;
  }
  &__checkbox {
    color: var(--color-text-button);
    & span {
      margin-left: 10px;
    }
  }
  &__submit-button {
    width: 134px;
    height: 43px;
    padding: 0;
    border-radius: var(--border-radius-button);
    // background-color: var(--item-main-color);
    background-color: var(--background-color-button-translate);
    box-shadow: var(--box-shadow-button);
    // border: var(--border-button);
    // border-color: var(--border-color-button);
    &:active .tyre-filter__submit-button-text {
      transform: translate(0px, 0px);
    }
  }
  &__submit-button-text {
    display: block;
    // height: 100%;
    padding: 12px 12px;
    transform: translate(0px, -2px);
    transition: transform 100ms;
    background-color: var(--item-main-color);
    border-radius: var(--border-radius-button);
    border: var(--border-button);
    border-color: var(--border-color-button);
  }
}
</style>
