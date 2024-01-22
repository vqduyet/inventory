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
      accountServices.verifyAccount(this.payload).then((resp) => {
        if (!resp.error) {
          this.$router.push({
            name: 'SuccessPage',
            params: {
              title: 'Account Verified!',
              subTitle: 'You have successfully updated the password',
              icon: 'far fa-check-circle'
            }
          })
        }
      })
    }
  }
}
