import settingsService from '../../../../services/settings'
import { STATUS_LIST } from '../../../../commons/constants'
import _ from 'lodash'
import 'vue-select/dist/vue-select.css'

export default {
  props: {
    id: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data() {
    return {
      loading: false,
      formType: '',
      item: null,
      defaultItem: {
        user_id: null,
        email: '',
        phone: '',
        fname: '',
        lname: '',
        password: '',
        role_id: ''
      },
      statusList: STATUS_LIST,
      roleList: [],
      isResetPassword: false
    }
  },
  created() {
    this.loading = true
    if (this.id) {
      this.formType = 'Edit'
      this.getAllRoles().then((res) => {
        this.roleList = res
        this.getItem(this.id)
      })
    } else {
      this.formType = 'Add'
      this.item = _.cloneDeep(this.defaultItem)
      this.getAllRoles()
        .then((res) => {
          this.roleList = res
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  methods: {
    getAllRoles() {
      return new Promise((resolve) => {
        settingsService.getAllRolesMeta().then((res) => {
          if (res.data.ok) {
            resolve(res.data.d)
          } else {
            resolve([])
          }
        })
      })
    },
    getItem(id) {
      this.loading = true
      settingsService
        .getUser(id)
        .then((res) => {
          if (res.data.ok) {
            this.item = res.data.d
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    close() {
      this.$emit('close')
    },
    async save() {
      const isValid = await this.$refs['observer-form'].validate()
      if (isValid) {
        if (this.formType === 'Edit') {
          this.updateItem()
        } else {
          this.createItem()
        }
      }
    },

    async createItem() {
      try {
        this.loading = true
        const resp = await settingsService.createUser({
          ...this.item,
          roles: [this.item.role_id]
        })
        if (resp.data.ok) {
          this.$emit('completed', {
            id: resp.data.d,
            formType: this.formType
          })
        }
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },

    async updateItem() {
      try {
        this.loading = true
        let isCompleted = false
        const resp = await settingsService.updateUser({
          ...this.item,
          roles: [this.item.role_id]
        })
        if (resp.data.ok) {
          if (this.item.password && this.isResetPassword) {
            const resetPasswordResp = await settingsService.resetPassword({
              ...this.item
            })
            if (resetPasswordResp.data.ok) {
              isCompleted = true
            }
          } else {
            isCompleted = true
          }
          if (isCompleted) {
            this.$emit('completed', {
              id: this.item.user_id,
              formType: this.formType
            })
          }
        }
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },

    generatePassword() {
      this.item.password = Math.random().toString(36).slice(-8)
    },

    toggleResetPassword() {
      this.isResetPassword = !this.isResetPassword
      if (!this.isResetPassword) {
        this.item.password = ''
      }
    }
  }
}
