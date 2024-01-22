import authService from '../../services/auth'
import { AUTH_ACTIONS } from '../../store/actions'

export default {
  data() {
    return {
      loading: false,
      user: null,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    async getProfile() {
      try {
        this.loading = true
        const res = await authService.getUserProfile()
        if (!res.error) {
          this.user = res.data.d
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    async updateProfile() {
      const isValid = await this.$refs['update-form'].validate()
      if (isValid) {
        try {
          this.loading = true
          const res = await authService.updateProfile(this.user)
          if (!res.error) {
            this._showToast('Update successfully!')
            this.$store.dispatch(AUTH_ACTIONS.GET_USER_PROFILE)
            await this.getProfile()
          }
        } catch (err) {
          console.log(err)
        }
        this.loading = false
      }
    },
    async changePassword() {
      const isValid = await this.$refs['password-form'].validate()
      if (isValid) {
        try {
          this.loading = true
          const res = await authService.changePassword({
            current_password: this.currentPassword,
            new_password: this.newPassword,
            confirm_new_password: this.confirmPassword
          })
          if (!res.error) {
            this._showToast('Change password successfully!')
            this.refreshPassword()
            await this.$refs['password-form'].reset()
          }
        } catch (err) {
          console.log(err)
        }
        this.loading = false
      }
    },
    refreshPassword() {
      this.currentPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    }
  }
}
