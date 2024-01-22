import Vue from 'vue'
import appStore from '../store'
import { APP_MUTATIONS } from '../store/mutations'
import { hasAnyPermission } from '../misc/auth'
import { PERMISSIONS } from '../commons/constants'
import _ from 'lodash'

Vue.mixin({
  metaInfo() {
    let pageTitle = this.$route ? this.$route.name ?? '' : ''
    return {
      title: pageTitle ?? 'Awesome App',
      titleTemplate: '%s | Awesome App'
    }
  },
  data() {
    return {
      PERMISSIONS: PERMISSIONS
    }
  },
  computed: {},
  methods: {
    openExternalLink(url) {
      window.open(url, '_blank')
    },
    _checkPermissions(permissions) {
      return permissions ? hasAnyPermission(permissions) : true
    },
    _showConfirm(message, options) {
      return new Promise((resolve) => {
        if (this.$root.$children[0]) {
          this.$root.$children[0].$refs.confirm.showConfirm(message, options).then((resp) => {
            resolve(resp)
          })
        }
      })
    },
    _showNotify(title, message, variant, options) {
      this.$root.$children[0] ? this.$root.$children[0].$refs.notify.addNotify(title, message, variant, options) : ''
    },
    _showToast(message, options) {
      this.$root.$children[0] ? this.$root.$children[0].$refs.toast.addToast(message, options) : ''
    },
    _loadingStart() {
      appStore.commit(APP_MUTATIONS.LOADING_START)
    },
    _loadingEnd() {
      appStore.commit(APP_MUTATIONS.LOADING_END)
    },
    _getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  }
})
