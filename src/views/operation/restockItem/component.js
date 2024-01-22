import itemsService from '../../../services/items'
import { STATUS_LIST, MEASURE_TYPES, UNITS } from '../../../commons/constants'
import _ from 'lodash'
import Datepicker from 'vuejs-datepicker'
import { format, add, sub } from 'date-fns'

export default {
  components: {
    Datepicker
  },
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
      formData: {
        entryDatetime: new Date(),
        expiredDatetime: null,
        // unitPrice: 0,
        quantity: 0,
        amount: 0,
        source: ''
      },
      statusList: STATUS_LIST,
      categoryList: [],
      measureTypeList: MEASURE_TYPES,
      disabledDates: {
        to: sub(new Date(), { days: 1 })
      }
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
            this.formData = {
              ...this.formData,
              expiredDatetime: add(this.formData.entryDatetime, {
                days: this.item.shelf_life
              })
              //unitPrice: this.item.base_unit_price
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
        this.restockItem()
      }
    },
    restockItem() {
      this.loading = true
      itemsService
        .restockItem({
          item_id: this.item.id,
          entry_datetime: this.formData.entryDatetime,
          expired_datetime: this.formData.expiredDatetime,
          quantity: this.formData.quantity,
          amount: this.formData.amount,
          // unit_price: this.formData.unitPrice,
          source: this.formData.source
        })
        .then((resp) => {
          if (resp.data.ok) {
            this.$emit('completed')
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    customFormatter(date) {
      return format(date, 'yyyy/MM/dd')
    }
  }
}
