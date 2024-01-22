import settingsService from '../../../../services/settings'
import { STATUS_LIST } from '../../../../commons/constants'
import _ from 'lodash'
import 'vue-select/dist/vue-select.css'

export default {
  props: {
    id: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      loading: false,
      formType: '',
      item: null,
      defaultItem: {
        id: null,
        name: '',
        permissions: [],
        status: 'ACTIVE'
      },
      statusList: STATUS_LIST,
      permissionList: []
    }
  },
  created() {
    this.loading = true
    if (this.id) {
      this.formType = 'Edit'
      this.getAllPermissions().then((res) => {
        this.permissionList.push(...res.map((x) => x.id))
        this.getItem(this.id)
      })
    } else {
      this.formType = 'Add'
      this.item = _.cloneDeep(this.defaultItem)
      this.getAllPermissions()
        .then((res) => {
          this.permissionList.push(...res.map((x) => x.id))
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  methods: {
    getAllPermissions() {
      return new Promise((resolve) => {
        settingsService.getAllPermissionsMeta().then((res) => {
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
        .getRole(id)
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

    createItem() {
      this.loading = true
      settingsService
        .createRole(this.item)
        .then((resp) => {
          if (resp.data.ok) {
            this.$emit('completed', {
              id: resp.data.d,
              formType: this.formType
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    updateItem() {
      this.loading = true
      settingsService
        .updateRole(this.item)
        .then((resp) => {
          if (resp.data.ok) {
            this.$emit('completed', {
              id: this.item.id,
              formType: this.formType
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
