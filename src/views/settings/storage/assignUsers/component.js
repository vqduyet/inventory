import settingsService from '../../../../services/settings'
import _ from 'lodash'

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
      users: []
    }
  },
  computed: {
    availableUsers: function () {
      if (this.item && this.item.users && this.users) {
        return this.users.filter((x) => !this.item.users.includes(x.user_id))
      } else {
        return _.cloneDeep(this.users)
      }
    },
    assignedUsers: function () {
      if (this.item && this.item.users && this.users) {
        return this.users.filter((x) => this.item.users.includes(x.user_id))
      } else {
        return []
      }
    }
  },
  async created() {
    await this.initialLoadData()
  },
  methods: {
    async initialLoadData() {
      if (this.id) {
        this.loading = true
        await this.getUsers()
        await this.getItem(this.id)
        this.loading = false
      }
    },
    async getUsers() {
      try {
        const res = await settingsService.getUsersMeta()
        if (res.data.ok) {
          this.users = res.data.d
        } else {
          this.users = []
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getItem(id) {
      try {
        const res = await settingsService.getStorage(id)
        if (res.data.ok) {
          this.item = {
            ...res.data.d,
            users: res.data.d.users ? res.data.d.users : []
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    close() {
      this.$emit('close')
    },
    async save() {
      try {
        this.loading = true
        await settingsService.assignStorageToUsers({
          id: this.item.id,
          users: this.item.users
        })
        this.$emit('completed')
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    addUser(user) {
      const _index = this.item.users.findIndex((x) => x === user.user_id)
      if (_index < 0) {
        this.item.users.push(user.user_id)
      }
    },
    removeUser(user) {
      const _index = this.item.users.findIndex((x) => x === user.user_id)
      if (_index > -1) {
        this.item.users.splice(_index, 1)
      }
    }
  }
}
