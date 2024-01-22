<template>
  <div>
    <b-modal
      v-model="item.enable"
      size="sm"
      centered
      scrollable
      :title="item.title"
      :header-bg-variant="item.variant"
      header-text-variant="light"
      v-for="item in arrNoti"
      :key="item.id"
    >
      {{ item.message }}
      <template v-slot:modal-footer="{ cancel }">
        <b-button variant="outline-secondary" outlined @click="cancel" size="sm" class="m-0"> Close </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      arrNoti: []
    }
  },
  methods: {
    addNotify(title, message, variant, options = {}) {
      this.id += 1
      const noti = {
        enable: false,
        id: this.id,
        title: title,
        message: message,
        variant: variant || 'info',
        ...options
      }

      this.arrNoti.push(noti)

      this.$nextTick(() => {
        noti.enable = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .modal-content {
  border: 0px;
}
</style>
