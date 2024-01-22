import settingsService from '../../../services/settings'
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
      isShowAddEditCategory: false,
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
      settingsService
        .findCategories(this.searchParams)
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
    showAddEditCategory(id) {
      this.selectedItemId = id
      this.$nextTick(() => {
        this.isShowAddEditCategory = true
      })
    },
    hideAddEditCategory() {
      this.selectedItemId = null
      this.isShowAddEditCategory = false
    },
    completeAddEditCategory(data) {
      this._showToast(`${data.formType} successfully!`)
      this.hideAddEditCategory()
      this.getAll()
    }
  }
}
