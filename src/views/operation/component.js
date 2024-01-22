import settingsService from '../../services/settings'
import itemsService from '../../services/items'
import restockItem from './restockItem'
import putToUseItem from './putToUseItem'
import disposeItem from './disposeItem'

export default {
  components: {
    restockItem,
    putToUseItem,
    disposeItem
  },
  data() {
    return {
      storages: [],
      items: [],
      selectedStorageId: null,
      loading: false,
      isShowRestockItem: false,
      isShowPutToUseItem: false,
      isShowDisposeItem: false,
      selectedItemId: null
    }
  },
  computed: {
    selectedStorage() {
      return this.storages.find((x) => x.id === this.selectedStorageId)
    }
  },
  created() {
    this.loading = true
    this.getAllStoragesByAuthUser().then((res) => {
      this.storages = res
      if (this.storages && this.storages.length > 0) {
        this.selectedStorageId = this.storages[0].id
        this.getItemsByStorage(this.selectedStorageId)
      } else {
        this.loading = false
      }
    })
  },
  methods: {
    getAllStoragesByAuthUser() {
      return new Promise((resolve) => {
        settingsService.getAllStoragesByAuthUser().then((res) => {
          if (res.data.ok) {
            resolve(res.data.d)
          } else {
            resolve([])
          }
        })
      })
    },
    getItemsByStorage(storageId) {
      this.loading = true
      itemsService
        .getItemsByStorage(storageId)
        .then((res) => {
          if (res.data.ok) {
            this.items = res.data.d
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSelectStorage(storageId) {
      if (this.selectedStorageId !== storageId) {
        const storage = this.storages.find((x) => x.id === storageId)
        if (storage) {
          this.selectedStorageId = storage.id
          this.$nextTick(() => {
            this.getItemsByStorage(this.selectedStorageId)
          })
        } else {
          this.selectedStorageId = null
        }
      }
    },
    openRestockDialog(itemId) {
      this.selectedItemId = itemId
      this.$nextTick(() => {
        this.isShowRestockItem = true
      })
    },
    hideRestockDialog() {
      this.selectedItemId = null
      this.isShowRestockItem = false
    },
    completeRestockItem() {
      this._showToast('Restock successfully!')
      this.hideRestockDialog()
      this.getItemsByStorage(this.selectedStorageId)
    },

    openPutToUseDialog(itemId) {
      this.selectedItemId = itemId
      this.$nextTick(() => {
        this.isShowPutToUseItem = true
      })
    },
    hidePutToUseDialog() {
      this.selectedItemId = null
      this.isShowPutToUseItem = false
    },
    completePutToUseItem() {
      this._showToast('PutToUse successfully!')
      this.hidePutToUseDialog()
      this.getItemsByStorage(this.selectedStorageId)
    },

    openDisposeDialog(itemId) {
      this.selectedItemId = itemId
      this.$nextTick(() => {
        this.isShowDisposeItem = true
      })
    },
    hideDisposeDialog() {
      this.selectedItemId = null
      this.isShowDisposeItem = false
    },
    completeDisposeItem() {
      this._showToast('Dispose successfully!')
      this.hideDisposeDialog()
      this.getItemsByStorage(this.selectedStorageId)
    }
  }
}
