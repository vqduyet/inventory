import accountServices from '../../../services/account'

export default {
  data() {
    return {
      loading: false,
      email: ''
    }
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs['observer'].validate()
      if (!isValid) {
        this._showToast('Please check your information', { variant: 'warning' })
      } else {
        this.loading = true
        accountServices.forgotPassword({ email: this.email }).then((resp) => {
          this.loading = false
          if (!resp.error) {
            this.$router.push({
              name: 'SuccessPage',
              params: {
                title: 'Sent successfully!',
                subTitle: 'Kindly check your email for further action',
                icon: 'far fa-check-circle'
              }
            })
          }
        })
      }
    }
  }
}
