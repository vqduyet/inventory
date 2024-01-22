<template>
  <div id="app">
    <component :is="layout" />
    <!-- <core-loading /> -->
    <core-notify ref="notify" />
    <core-toast ref="toast" />
    <core-confirm ref="confirm" />
  </div>
</template>

<style lang="scss"></style>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || 'layout-default'
    }
  },
  mounted() {
    window.globalNotify = this.$refs.notify || null
    window.globalToast = this.$refs.toast || null
  }
}
</script>
