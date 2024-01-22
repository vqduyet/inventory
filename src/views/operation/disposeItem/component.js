import itemsService from '../../../services/items'
import { STATUS_LIST, MEASURE_TYPES, UNITS } from '../../../commons/constants'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      item: null,
      statusList: STATUS_LIST,
      categoryList: [],
      measureTypeList: MEASURE_TYPES
    }
  },
  computed: {
    unitList() {
      let units = []
      if (this.item && this.item.measure_type) {
        units = UNITS[this.item.measure_type]
      }
      return units
    }
  },
  created() {
    this.getItem(this.id)
  },
  methods: {
    getItem(id) {
      this.loading = true
      itemsService
        .getItemWithStockInfo(id)
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
    save() {
      if (this.item && this.item.expired_quantity > 0) {
        this.disposeItem()
      }
    },
    disposeItem() {
      this.loading = true
      itemsService
        .disposeItem(this.item.id)
        .then((resp) => {
          if (resp.data.ok) {
            this.$emit('completed')
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
