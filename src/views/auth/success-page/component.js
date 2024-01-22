export default {
  props: {
    title: { type: String, default: 'Title' },
    icon: { type: String, default: 'far fa-check-circle' },
    subTitle: { type: String, default: 'SubTitle' },
    dismissSecs: { type: Number, default: 5 },
    isRedirect: { type: Boolean, default: true }
  },
  data() {
    return {
      dismissCountDown: 0
    }
  },
  created() {
    if (this.isRedirect) {
      this.showAlert()
      setTimeout(() => {
        this.$router.push({ name: 'Login' })
      }, this.dismissSecs * 1000)
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
