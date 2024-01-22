import settingsService from '../../../services/settings'
import addEditItem from './addEditItem'
import assignUsers from './assignUsers'
import { STATUS_LIST } from '../../../commons/constants'

export default {
  components: {
    addEditItem,
    assignUsers
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
      isShowAddEditStorage: false,
      isShowAssignedUsers: false,
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
        .findStorages(this.searchParams)
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
    showAddEditStorage(id) {
      this.selectedItemId = id
      this.$nextTick(() => {
        this.isShowAddEditStorage = true
      })
    },
    hideAddEditStorage() {
      this.selectedItemId = null
      this.isShowAddEditStorage = false
    },
    completeAddEditStorage(data) {
      this._showToast(`${data.formType} successfully!`)
      this.hideAddEditStorage()
      this.getAll()
    },

    showAssignedUsers(id) {
      this.selectedItemId = id
      this.$nextTick(() => {
        this.isShowAssignedUsers = true
      })
    },
    hideAssignedUsers() {
      this.selectedItemId = null
      this.isShowAssignedUsers = false
    },
    completeAssignedUsers() {
      this._showToast('Assign users successfully!')
      this.hideAssignedUsers()
    }
  }
}
