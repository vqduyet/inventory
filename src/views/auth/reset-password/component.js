import accountServices from '../../../services/account'
export default {
  data() {
    return {
      payload: {}
    }
  },
  created() {
    if (this.$route && this.$route.query.c && this.$route.query.e) {
      this.payload = {
        token: this.$route.query.c,
        email: this.$route.query.e,
        password: null,
        confirm_password: null
      }
    } else {
      this.$router.push({ name: 'Login' })
    }
  },
  methods: {
    verifyAccount() {
      accountServices.resetPassword(this.payload).then((resp) => {
        if (!resp.error) {
          this.$router.push({
            name: 'SuccessPage',
            params: {
              title: 'Password Changed!',
              subTitle: 'Your password has been changeed successfully.',
              icon: 'far fa-check-circle'
            }
          })
        }
      })
    }
  }
}
