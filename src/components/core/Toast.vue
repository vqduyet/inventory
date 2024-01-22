<template>
  <div />
</template>

<script>
export default {
  methods: {
    addToast(message = '', option = {}) {
      this.$bvToast.toast(message, {
        title: 'Notice',
        variant: 'success',
        autoHideDelay: 3000,
        appendToast: false,
        toaster: 'b-toaster-top-right',
        ...option
      })
    }
  }
}
</script>
