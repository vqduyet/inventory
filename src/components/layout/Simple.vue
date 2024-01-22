<template>
  <div class="login d-flex align-items-center justify-content-center">
    <div
      class="animation-card"
      :style="{
        backgroundImage: 'url(' + require('@/assets/img/bg-bw.png') + ')'
      }"
    />
    <router-view />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ececec;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

@keyframes zoominoutsinglefeatured {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}

.animation-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: zoominoutsinglefeatured 30s infinite;
}
</style>
