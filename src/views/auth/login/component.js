import { AUTH_ACTIONS } from '../../../store/actions'

export default {
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      isShowPassword: false
    }
  },
  computed: {
    passwordIcon() {
      return this.isShowPassword ? 'eye-slash' : 'eye'
    },
    passwordInputType() {
      return this.isShowPassword ? 'text' : 'password'
    }
  },
  methods: {
    async onSubmitLogin() {
      const isValid = await this.$refs['observer-login'].validate()
      if (!isValid) {
        this._showToast('Please check your information', { variant: 'warning' })
      } else {
        this.loading = true
        this.$store
          .dispatch(AUTH_ACTIONS.LOGIN, {
            client_id: 'web-client',
            grant_type: 'password',
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.loading = false
          })
      }
    },
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword
    }
  }
}
