<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__top">
        <div class="header__top-select">Санкт-Петербург</div>
        <div class="header__top-element">Отзывы</div>
        <div class="header__top-element">Покупателям</div>
        <input placeholder="Поиск по сайту" />
        <button>Войти</button>
      </div>
      <div class="header__center">
        <div>Корзина</div>
      </div>
      <nav class="header__nav">
        <div class="header__nav-wrapper app-wrapper">
          <RouterLink class="header__nav-link" to="/">ШИНЫ</RouterLink>
          <RouterLink class="header__nav-link" to="/about">ГРУЗОВЫЕ ШИНЫ</RouterLink>
          <RouterLink class="header__nav-link" to="/about">МОТОШИНЫ</RouterLink>
          <RouterLink class="header__nav-link" to="/about">ДИСКИ</RouterLink>
          <RouterLink class="header__nav-link" to="/about">ПУНКТЫ ВЫДАЧИ</RouterLink>
          <RouterLink class="header__nav-link" to="/about">АКЦИИ</RouterLink>
          <RouterLink class="header__nav-link" to="/about">КОНТАКТЫ</RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  height: 60px;
  // border: 2px solid #000;
  &__top {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
  }
  &__nav {
    background-color: var(--background-color-header);
  }
  &__nav-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
    align-items: center;
    justify-items: center;
    height: 50px;
    color: var(--color-text-header);
  }
}
</style>
