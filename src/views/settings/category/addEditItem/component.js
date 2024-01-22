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
        storage_id: null,
        destination_id: null
      },
      statusList: STATUS_LIST,
      storageList: [],
      categoryList: [
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
        this.storageList = res
        this.getItem(this.id)
      })
    } else {
      this.formType = 'Add'
      this.item = _.cloneDeep(this.defaultItem)
      this.getAllStorages()
        .then((res) => {
          this.storageList = res
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
        .getCategory(id)
        .then((res) => {
          if (res.data.ok) {
            this.item = res.data.d
            const _storage = this.storageList.find((x) => x.id === this.item.storage_id)
            if (_storage && _storage.destination_id) {
              this.loadCategoryListByStorage(_storage.destination_id)
            }
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
        .createCategory(this.item)
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
        .updateCategory(this.item)
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
    },

    handleChangeSelectStorage() {
      const selectedStorage = this.storageList.find((x) => x.id === this.item.storage_id)
      if (selectedStorage && selectedStorage.destination_id) {
        this.item.destination_id = null
        this.loadCategoryListByStorage(selectedStorage.destination_id)
      } else {
        this.resetDestinationData()
      }
    },

    loadCategoryListByStorage(storageId) {
      this.loading = true
      settingsService
        .findCategoriesByStorage(storageId)
        .then((res) => {
          this.categoryList = [
            {
              id: null,
              name: '--- None ---'
            },
            ...res.data.d
          ]
        })
        .finally(() => {
          this.loading = false
        })
    },

    resetDestinationData() {
      this.item.destination_id = null
      this.categoryList = [
        {
          id: null,
          name: '--- None ---'
        }
      ]
    }
  }
}
