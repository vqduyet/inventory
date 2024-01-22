<template>
  <div v-if="show">
    <Navigator>
      <core-view />
      <slot />
    </Navigator>
  </div>
</template>

<script>
import Navigator from '../core/Navigator'

export default {
  components: {
    Navigator
  },
  computed: {
    show() {
      return this.$store.state.token ? true : false
    }
  }
}
</script>

<style scoped>
.core-bottom-nav {
  display: none;
}
@media screen and (max-width: 991px) {
  .core-bottom-nav {
    display: block;
  }
}
</style>
