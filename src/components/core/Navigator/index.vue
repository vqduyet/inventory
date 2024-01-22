<template>
  <div>
    <div class="main-wrapper" ref="mainWrapper">
      <div class="header">
        <div class="header-left">
          <a class="logo">
            <div class="lg">
              <b-img :src="require('@/assets/img/logo.png')" height="35" alt="" />
            </div>
            <div class="ms">
              <b-img :src="require('@/assets/img/logo.png')" height="37" alt="" />
            </div>
          </a>
        </div>
        <a id="toggle_btn" @click="sidebarToggle()">
          <font-awesome-icon icon="bars" />
        </a>
        <a id="mobile_btn" class="mobile_btn float-left pointer" @click="sidebarToggle('mobile')">
          <font-awesome-icon icon="bars" />
        </a>
        <ul class="nav user-menu float-right">
          <li class="nav-item dropdown has-arrow" ref="accountBtn">
            <a class="dropdown-toggle nav-link user-link pointer" @click="openAccountMenu" v-click-outside="clickOutsideAccountMenu">
              <span class="user-img" v-if="userPhoto">
                <img
                  class="rounded-circle"
                  :src="userPhoto ? 'data:image;base64,' + userPhoto : require('@/assets/img/logo.png')"
                  width="24"
                  height="24"
                  alt="Admin"
                />
                <span class="status online" />
              </span>
              <span>{{ user.fname }} {{ user.lname }}</span>
            </a>
            <b-dropdown ref="accountMenu" size="sm" variant="link" no-caret class="dropdownBtn" toggle-class="dropdownBtn">
              <router-link v-slot="{ navigate }" to="/profile">
                <b-dropdown-item @click="navigate">
                  <font-awesome-icon icon="address-card" class="mr-2" />
                  My Profile
                </b-dropdown-item>
              </router-link>
              <b-dropdown-item @click="logout">
                <font-awesome-icon icon="sign-out-alt" class="mr-2" />
                Logout
              </b-dropdown-item>
            </b-dropdown>
          </li>
        </ul>
        <div class="dropdown mobile-user-menu float-right">
          <a class="dropdown-toggle pointer" @click="openAccountMenuMobile">
            <font-awesome-icon icon="ellipsis-v" />
          </a>
          <b-dropdown ref="accountMenuMobile" size="sm" variant="link" no-caret class="dropdownBtnMobile" toggle-class="dropdownBtn">
            <router-link v-slot="{ navigate }" to="/profile">
              <b-dropdown-item @click="navigate">
                <font-awesome-icon icon="address-card" class="mr-2" />
                My Profile
              </b-dropdown-item>
            </router-link>
            <b-dropdown-item @click="logout">
              <font-awesome-icon icon="sign-out-alt" class="mr-2" />
              Logout
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="sidebar" id="sidebar" ref="sidebar">
        <div class="slimScrollDiv" ref="sidebarWrapper">
          <div @mouseover="hoverOn" @mouseleave="hoverOff" class="sidebar-inner">
            <!-- <vue-scroll> -->
            <div id="sidebar-menu" class="sidebar-menu">
              <ul>
                <template v-for="(item, i) in items">
                  <li :key="i + '-nav'" class="menu-title" v-if="!item.to && !item.child && item.isAllowed">
                    {{ item.text }}
                  </li>
                  <router-link v-else-if="item.to && !item.child && item.isAllowed" v-slot="{ href, navigate, isActive }" :to="item.to" :key="i + '-nav'">
                    <li :class="isActive ? 'active' : ''">
                      <a :href="href" @click="navigate">
                        <font-awesome-icon :icon="item.icon" />
                        <span>{{ item.text }}</span>
                      </a>
                    </li>
                  </router-link>
                  <li v-else-if="!item.to && item.child && item.isAllowed" class="submenu" :key="i + '-nav'">
                    <a
                      @click="item.visible = !item.visible"
                      class="pointer"
                      :class="{
                        subdrop: item.visible,
                        active: hasAnyActiveChild(item)
                      }"
                    >
                      <font-awesome-icon :icon="item.icon" />
                      <span> {{ item.text }} </span>
                      <span class="menu-arrow">
                        <font-awesome-icon icon="angle-right" />
                      </span>
                    </a>
                    <ul class="child-subdrop">
                      <b-collapse v-model="item.visible">
                        <template v-for="(child, childI) in item.child">
                          <router-link v-slot="{ href, navigate, isExactActive }" :to="child.to" :key="childI + '-subnav'">
                            <li :class="isExactActive ? 'active' : ''">
                              <a :href="href" @click="navigate">
                                <font-awesome-icon :icon="child.icon" class="mr-2" style="width: 30px" />
                                {{ child.text }}
                              </a>
                            </li>
                          </router-link>
                        </template>
                      </b-collapse>
                    </ul>
                  </li>
                </template>
              </ul>
            </div>
            <!-- </vue-scroll> -->
          </div>
        </div>
      </div>
      <div class="page-wrapper">
        <nav aria-label="breadcrumb" class="breadcrumb-wrapper" v-if="crumbs && crumbs.length > 1">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item" v-for="(item, i) in crumbs" :key="i + '-crumbs-item'">
              <router-link :to="item.to" v-if="item.to">
                {{ item.text }}
              </router-link>
              <template v-else>
                {{ item.text }}
              </template>
            </li>
          </ol>
        </nav>
        <slot />
      </div>
      <div class="overlay" ref="overlay" @click="overlayClick" />
    </div>
  </div>
</template>

<script src="./component.js"></script>

<style scoped>
.sidebar-menu > ul > li > a {
  padding: 12px 8px 12px 20px;
}

.dropdownBtn {
  position: absolute;
  right: 0px;
  bottom: -10px;
}

.dropdownBtn >>> .dropdownBtn {
  top: -10px !important;
  padding: 0 !important;
}

.dropdownBtnMobile >>> .dropdownBtn {
  top: -25px !important;
  padding: 0 !important;
}

.nav-item.dropdown.has-arrow.show > a {
  background-color: rgba(0, 0, 0, 0.2);
}

.page-wrapper > .content {
  padding: 10px;
}

.slide-nav .overlay {
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
}

.slide-nav .overlay.show {
  display: block;
}

.dropdown-toggle.nav-link.user-link .user-img {
  margin: 0 5px;
}

.dropdown-toggle.nav-link.user-link .user-img img {
  margin-top: -5px;
}

.dropdown-toggle::after {
  margin-left: 6px;
  vertical-align: 2px;
}

.slimScrollDiv {
  position: relative;
  overflow: hidden;
  width: 100%;
}
.slimscroll {
  overflow: hidden;
  width: 100%;
}
.header-left .logo .lg {
  display: block;
}
.header-left .logo .ms {
  display: none;
}

.mini-sidebar .header-left .logo .lg {
  display: block;
}
.mini-sidebar .header-left .logo .ms {
  display: none;
}

@media only screen and (min-width: 991px) {
  .header-left .logo .lg {
    display: block;
  }
  .header-left .logo .ms {
    display: none;
  }
  .mini-sidebar .header-left .logo .lg {
    display: none;
  }
  .mini-sidebar .header-left .logo .ms {
    display: block;
  }
}
.main-wrapper.mini-sidebar:not(.expand-menu) .child-subdrop {
  display: none !important;
}
.custom-avatar {
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
}
.breadcrumb-wrapper {
  font-size: 14px;
}
.submenu a.active {
  color: #009efb;
}
</style>
