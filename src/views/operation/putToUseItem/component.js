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
      destinationItem: null,
      formData: {
        useDatetime: new Date(),
        quantity: 0,
        reason: '',
        destQuantity: 0,
        destExpiredDatetime: null
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
    //this.getItem(this.id)
    this.getItemData()
  },
  methods: {
    async getItemData() {
      this.loading = true
      try {
        let itemRes = await itemsService.getItemWithStockInfo(this.id)
        this.item = itemRes.data.d
        if (this.item && this.item.destination_id) {
          let destinationItemRes = await itemsService.getItemWithStockInfo(this.item.destination_id)
          this.destinationItem = destinationItemRes.data.d
          this.formData.destExpiredDatetime = add(this.formData.useDatetime, {
            days: this.destinationItem.shelf_life
          })
        }
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },

    // getItem(id) {
    //   this.loading = true
    //   itemsService
    //     .getItemWithStockInfo(id)
    //     .then((res) => {
    //       if (res.data.ok) {
    //         this.item = res.data.d
    //       }
    //     })
    //     .finally(() => {
    //       this.loading = false
    //     })
    // },
    close() {
      this.$emit('close')
    },
    async save() {
      const isValid = await this.$refs['observer-form'].validate()
      if (isValid) {
        this.putToUse()
      }
    },
    putToUse() {
      this.loading = true
      itemsService
        .putToUse({
          item_id: this.item.id,
          use_datetime: this.formData.useDatetime,
          quantity: this.formData.quantity,
          reason: this.formData.reason,
          dest_item_id: this.destinationItem ? this.destinationItem.id : null,
          dest_quantity: this.destinationItem ? this.formData.destQuantity : null,
          dest_expired_datetime: this.destinationItem ? this.formData.destExpiredDatetime : null
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
