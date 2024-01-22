import itemsService from '../../../../services/items'
import settingsService from '../../../../services/settings'
import { STATUS_LIST, MEASURE_TYPES, UNITS } from '../../../../commons/constants'
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
        category_id: null,
        shelf_life: 0,
        measure_type: '',
        unit: '',
        base_unit_price: 0,
        min_quantity: 0,
        max_quantity: 0,
        destination_id: null
      },
      statusList: STATUS_LIST,
      categoryList: [],
      measureTypeList: MEASURE_TYPES,
      itemList: [
        {
          id: null,
          name: '--- None ---'
        }
      ]
    }
  },
  computed: {
    unitList() {
      let units = []
      if (this.item && this.item.measure_type) {
        units = UNITS[this.item.measure_type]
      }
      return units
    },
    selectedCategory() {
      return this.categoryList.find((x) => x.id === this.item.category_id)
    }
  },
  created() {
    this.loading = true
    if (this.id) {
      this.formType = 'Edit'
      this.getAllCategories().then((res) => {
        this.categoryList = res
        this.getItem(this.id)
      })
    } else {
      this.formType = 'Add'
      this.item = _.cloneDeep(this.defaultItem)
      this.getAllCategories()
        .then((res) => {
          this.categoryList = res
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  methods: {
    getAllCategories() {
      return new Promise((resolve) => {
        settingsService.getAllCategories().then((res) => {
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
      itemsService
        .getItem(id)
        .then((res) => {
          if (res.data.ok) {
            this.item = res.data.d
            const _category = this.categoryList.find((x) => x.id === this.item.category_id)
            if (_category && _category.destination_id) {
              this.loadItemListByCategory(_category.destination_id)
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
        if (!this.selectedCategory.is_show_price) {
          this.item.base_unit_price = 0
        }
        if (this.formType === 'Edit') {
          this.updateItem()
        } else {
          this.createItem()
        }
      }
    },

    createItem() {
      this.loading = true
      itemsService
        .createItem(this.item)
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
      itemsService
        .updateItem(this.item)
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

    handleMeasureTypeChange() {
      this.item.unit = ''
    },

    handleChangeSelectCategory() {
      const selectedCategory = this.categoryList.find((x) => x.id === this.item.category_id)
      if (selectedCategory && selectedCategory.destination_id) {
        this.item.destination_id = null
        this.loadItemListByCategory(selectedCategory.destination_id)
      } else {
        this.resetDestinationData()
      }
    },

    loadItemListByCategory(categoryId) {
      this.loading = true
      itemsService
        .getItemsByCategory(categoryId)
        .then((res) => {
          this.itemList = [
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
      this.itemList = [
        {
          id: null,
          name: '--- None ---'
        }
      ]
    }
  }
}
