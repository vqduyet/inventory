import itemsService from '../../../services/items'
import addEditItem from './addEditItem'
import { STATUS_LIST } from '../../../commons/constants'

export default {
  components: {
    addEditItem
  },
  data() {
    return {
      loading: false,
      items: [],
      searchParams: {
        paging: {
          page: 1,
          size: 10,
          total: 0
        }
      },
      isShowAddEditItem: false,
      selectedItemId: null,
      statusList: STATUS_LIST
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      this.loading = true
      itemsService
        .findItems(this.searchParams)
        .then((resp) => {
          if (resp.data.ok) {
            this.items = resp.data.d.c
            this.searchParams.paging.page = resp.data.d.p
            this.searchParams.paging.size = resp.data.d.s
            this.searchParams.paging.total = resp.data.d.t
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    loadPage(value) {
      this.searchParams.paging.page = value
      this.getAll()
    },
    showAddEditItem(id) {
      this.selectedItemId = id
      this.$nextTick(() => {
        this.isShowAddEditItem = true
      })
    },
    hideAddEditItem() {
      this.selectedItemId = null
      this.isShowAddEditItem = false
    },
    completeAddEditItem(data) {
      this._showToast(`${data.formType} successfully!`)
      this.hideAddEditItem()
      this.getAll()
    }
  }
}
