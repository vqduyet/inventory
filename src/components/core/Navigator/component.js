import _ from 'lodash'
import { AUTH_ACTIONS } from '../../../store/actions'
import { paths } from '../../../router/paths'
import { getDefaultRoute } from '../../../router'
import { PERMISSIONS } from '../../../commons/constants'

export default {
  data() {
    return {
      isSidebarOpen: true,
      btnActionType: null,
      items: [
        {
          to: paths.home.path,
          text: 'Home',
          icon: 'home',
          isAllowed: true
        },
        {
          to: paths.operaton.path,
          text: 'Operation',
          icon: 'shield-alt',
          isAllowed: this._checkPermissions([PERMISSIONS.menu.operation])
        },
        {
          to: null,
          text: 'Settings',
          icon: 'tools',
          isAllowed: this._checkPermissions([PERMISSIONS.menu.settings]),
          visible: false,
          child: [
            {
              to: 'storage',
              text: 'Storage',
              icon: 'boxes',
              isAllowed: this._checkPermissions([PERMISSIONS.storage.read])
            },
            {
              to: 'category',
              text: 'Category',
              icon: 'sitemap',
              isAllowed: this._checkPermissions([PERMISSIONS.category.read])
            },
            {
              to: 'item',
              text: 'Item',
              icon: 'box',
              isAllowed: this._checkPermissions([PERMISSIONS.item.read])
            },
            {
              to: 'role',
              text: 'Role',
              icon: 'layer-group',
              isAllowed: this._checkPermissions([PERMISSIONS.role.read])
            },
            {
              to: 'user',
              text: 'User',
              icon: 'user-tag',
              isAllowed: this._checkPermissions([PERMISSIONS.user.read])
            }
          ]
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    userPhoto() {
      return _.isObject(this.$store.state.user) && this.$store.state.user.photo ? this.$store.state.user.photo : null
    },
    crumbs() {
      let pathArray = this.$route.path.split('/')
      pathArray.shift()
      let matched = this.$route.matched
      let defaultRoute = getDefaultRoute()
      let breadcrumbs = []

      if (matched[0] && matched[0].path == defaultRoute) {
        breadcrumbs.push({
          to: null,
          text: 'Home'
        })
      } else {
        breadcrumbs.push({
          to: defaultRoute,
          text: 'Home'
        })
        pathArray.forEach((el, idx) => {
          let fullPath = ''
          for (let j = 0; j <= idx; j++) {
            fullPath += '/' + pathArray[j]
          }
          for (const prop in paths) {
            if (paths[prop].path.replace(/\/:id$/, '') == fullPath) {
              breadcrumbs.push({
                to: fullPath,
                text: paths[prop].meta.breadCrumb
              })
            }
          }
        })
      }
      breadcrumbs[breadcrumbs.length - 1].to = null
      return breadcrumbs
    },
    currentRoutePath() {
      return this.$route.path.replace('/', '')
    }
  },

  created() {
    window.addEventListener('resize', this.screenResizeHandler)
    this.initialLoadingMenu()
  },

  destroyed() {
    window.removeEventListener('resize', this.screenResizeHandler)
  },

  mounted() {
    this.screenResizeHandler()
  },

  watch: {
    isSidebarOpen() {
      if (this.btnActionType == 'mobile') {
        this.$refs.mainWrapper.classList.toggle('slide-nav')
        this.$refs.sidebar.classList.toggle('opened')
        this.$refs.overlay.classList.toggle('show')
      } else {
        this.$refs.mainWrapper.classList.toggle('mini-sidebar')
      }
      this.btnActionType = null
    }
  },

  methods: {
    overlayClick() {
      this.btnActionType = 'mobile'
      this.isSidebarOpen = !this.isSidebarOpen
    },
    sidebarToggle(type) {
      this.btnActionType = type
      this.isSidebarOpen = !this.isSidebarOpen
    },
    logout() {
      this.$store.dispatch(AUTH_ACTIONS.LOGOUT)
    },
    screenResizeHandler() {
      let sidebarHeight = this.$refs.sidebar.clientHeight
      this.$refs.sidebarWrapper.style.height = sidebarHeight + 'px'
    },
    hoverOn() {
      this.$refs.mainWrapper.classList.add('expand-menu')
    },
    hoverOff() {
      this.$refs.mainWrapper.classList.remove('expand-menu')
    },
    openAccountMenu() {
      this.$refs.accountMenu.show()
      this.$refs.accountBtn.classList.add('show')
    },
    clickOutsideAccountMenu() {
      this.$refs.accountBtn.classList.remove('show')
    },
    openAccountMenuMobile() {
      this.$refs.accountMenuMobile.show()
    },
    hasAnyActiveChild(item) {
      if (!item.to && item.child) {
        const childRouteNames = item.child.map((x) => x.to)
        if (childRouteNames.includes(this.currentRoutePath)) {
          return true
        }
      }
      return false
    },
    initialLoadingMenu() {
      for (let i = 0; i < this.items.length; i++) {
        if (this.hasAnyActiveChild(this.items[i])) {
          this.items[i].visible = true
          break
        }
      }
    }
  }
}
