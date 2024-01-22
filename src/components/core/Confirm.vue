<template>
  <b-modal v-model="noti.enable" size="sm" centered scrollable :title="noti.title" :header-bg-variant="noti.variant" header-text-variant="light" ref="modal">
    {{ noti.message }}
    <template v-slot:modal-footer="{}">
      <b-button variant="outline-secondary" outlined @click="cancel" size="sm" class="m-0 mr-2"> Cancel </b-button>
      <b-button variant="secondary" @click="confirm" size="sm" class="m-0"> Confirm </b-button>
    </template>
  </b-modal>
</template>

<style lang="scss" scoped>
::v-deep .modal-content {
  border: 0px;
}
</style>

<script>
export default {
  data() {
    return {
      noti: {
        enable: false,
        id: null,
        title: null,
        message: null,
        variant: null
      },
      resolve: null
    }
  },
  methods: {
    showConfirm(message, options = {}) {
      this.noti = {
        enable: false,
        id: this.id,
        title: 'Are you sure?',
        message: message,
        variant: 'danger',
        ...options
      }
      this.$nextTick(() => {
        this.noti.enable = true
      })
      return new Promise((resolve) => {
        this.resolve = resolve
      })
    },
    confirm() {
      this.resolve(true)
      this.noti.enable = false
    },
    cancel() {
      this.resolve(false)
      this.noti.enable = false
    }
  }
}
</script>
