<template>
  <div class="tyre-filter">
    <div class="tyre-filter__header">
      <button>Подбор шин по типоразмеру</button>
      <button>По авто</button>
    </div>

    <div class="tyre-filter__body">
      <div class="tyre-filter__selectors">
        <div>Ширина</div>
        <div>Высота</div>
        <div>Диаметр</div>
        <div>Производитель</div>
        <div>Сезон</div>
        <div>Вн-ий диаметр</div>
      </div>
      <div class="tyre-filter__checkboxes">
        <label>
          <input type="checkbox" />
          <span>Спорт-пакет</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Run Flat</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Усыпанность (с)</span>
        </label>
      </div>
      <button>Подобрать</button>
    </div>
  </div>
</template>
<script lang="ts"></script>
<style scoped lang="scss">
.tyre-filter {
  max-width: 580px;
  &__body {
    display: grid;
    grid-template: repeat(2, auto) / auto;
  }
  &__selectors {
    display: grid;
    grid-template: repeat(2, auto) / repeat(3, auto);
  }
  &__checkboxes {
    display: grid;
    grid-template: auto / repeat(3, auto);
  }
}
</style>
