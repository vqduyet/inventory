<template>
  <transition name="fade">
    <div class="loading d-flex flex-row justify-content-center align-items-center" v-if="loading">
      <b-spinner variant="primary" label="Spinning" />
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading
    }
  }
}
</script>

<style lang="scss">
.loading {
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
}
.fade-enter-active {
  transition: opacity 0s;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
