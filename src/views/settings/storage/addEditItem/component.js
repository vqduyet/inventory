import settingsService from '../../../../services/settings'
import { STATUS_LIST } from '../../../../commons/constants'
import _ from 'lodash'

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
        id: null,
        name: '',
        description: '',
        status: 'ACTIVE',
        is_show_price: true,
        destination_id: null
      },
      statusList: STATUS_LIST,
      storageList: [
        {
          id: null,
          name: '--- None ---'
        }
      ]
    }
  },
  created() {
    this.loading = true
    if (this.id) {
      this.formType = 'Edit'
      this.getAllStorages().then((res) => {
        const filteredOptions = res.filter((x) => x.id !== this.id)
        this.storageList.push(...filteredOptions)
        this.getItem(this.id)
      })
    } else {
      this.formType = 'Add'
      this.item = _.cloneDeep(this.defaultItem)
      this.getAllStorages()
        .then((res) => {
          this.storageList.push(...res)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  methods: {
    getAllStorages() {
      return new Promise((resolve) => {
        settingsService.getAllStorages().then((res) => {
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
        .getStorage(id)
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
        .createStorage(this.item)
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
        .updateStorage(this.item)
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
