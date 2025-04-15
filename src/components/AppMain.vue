<template>
  <main class="main">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <slot />
  </main>
</template>
<style lang="scss" scoped>
.main {
  height: 100%;
  // border: 2px solid #51bff6;
  padding-top: 50px;
  padding-bottom: 200px;
  padding-left: var(--page--side-padding);
  padding-right: var(--page--side-padding);
}
</style>
