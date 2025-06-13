<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__top header_wrap">
        <div class="header__top-select">Санкт-Петербург</div>
        <div class="header__top-element">Отзывы</div>
        <div class="header__top-element">Покупателям</div>
        <!-- <input placeholder="Поиск по сайту" /> -->
        <AppInput placeholder="Поиск по сайту" />
        <button class="header__button-login" @click="openAuthModal"><IconLogin />Войти</button>
        <AppButton
          v-if="userStore.userData?.isLogged"
          class="header__button-auth"
          @click="$router.push('/admin-stock')"
          ><template #label>Админка</template></AppButton
        >
      </div>
      <div class="header__center header_wrap">
        <div class="header__center-buttons">
          <IconFavorite class="header__center-button--favorite" />
          <IconSettings class="header__center-button--settings" />
        </div>
        <div class="header__center-cart header__cart">
          <AppButton class="header__cart-button"><IconShoppingCart /></AppButton>
          <div class="header__cart-block">
            <div class="header__cart-text">Корзина</div>
            <div class="header__cart-items">{{ userStore?.userData?.cartItems }} товаров</div>
          </div>
        </div>
      </div>
      <nav class="header__nav">
        <div class="header__nav-wrapper app-wrapper">
          <RouterLink class="header__nav-link" to="/tires">ШИНЫ</RouterLink>
          <RouterLink class="header__nav-link" to="/">ГРУЗОВЫЕ ШИНЫ</RouterLink>
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
import AppButton from '@/components/ui/AppButton.vue'
import IconShoppingCart from '@/components/icons/IconShoppingCart.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconLogin from '@/components/icons/IconLogin.vue'
import { ref, defineAsyncComponent } from 'vue'
import { useUserStore } from '@/stores/user'
import { useModalStore } from '@/stores/modal'

const Authorization = defineAsyncComponent(
  () => import('@/components/modalViews/Authorization.vue'),
)

const modalStore = useModalStore()
const userStore = useUserStore()

// const userData = ref({
//   cartItems: 0,
// })

function favoriteClick() {}

function settingsClick() {}

function openAuthModal() {
  modalStore.open({ component: Authorization, data: {} })
}
</script>
<style lang="scss" scoped>
.header {
  // height: 60px;
  // border: 2px solid #000;
  &_wrap {
    max-width: calc(100% - 48px);
    margin-left: auto;
    margin-right: auto;
  }
  &__wrapper {
    // padding-left: 24px;
    // padding-right: 24px;
  }
  &__top {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, auto));
    align-items: center;
    // padding-left: 24px;
    // padding-right: 24px;
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
  &__button-login {
    max-width: 70px;
    background-color: transparent;
  }
  &__button-auth {
    max-width: 120px;
    font-weight: 500;
    font-size: 15px;
  }
  &__center {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-bottom: 24px;
    // padding-left: 24px;
    // padding-right: 24px;
  }
  &__center-buttons {
    display: flex;
    gap: 10px;
  }
  &__center-button {
    &--favorite {
      align-self: center;
    }
  }
  &__cart {
    display: flex;
    gap: 10px;
  }
}
</style>
