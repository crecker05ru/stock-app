<template>
  <main class="main">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <!-- <RouterLink to="/about">About</RouterLink> -->
      </nav>
    </div>
    <slot />
  </main>
</template>
<style lang="scss" scoped>
.main {
  height: 100%;
  border: 2px solid #51bff6;
}
</style>
