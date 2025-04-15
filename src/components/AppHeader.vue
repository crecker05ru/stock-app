<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__top">
        <div class="header__top-select">Санкт-Петербург</div>
        <div class="header__top-element">Отзывы</div>
        <div class="header__top-element">Покупателям</div>
        <!-- <input placeholder="Поиск по сайту" /> -->
        <AppInput placeholder="Поиск по сайту" />
        <button class="header__button-auth">Войти</button>
        <button class="header__button-auth" @click="$router.push('/admin-stock')">Админка</button>
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
<script setup lang="ts">
import AppInput from '@/components/ui/AppInput.vue'
</script>
<style lang="scss" scoped>
.header {
  // height: 60px;
  // border: 2px solid #000;
  &__top {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, auto));
    align-items: center;
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
  &__button-auth {
    max-width: 70px;
  }
}
</style>
