import Vue from 'vue'

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

const LOADING_CLASS_NAME = {
  panel: 'ld-loading'
}
const loadingProcess = {
  apply(el, loading) {
    this.panel(el, loading)
  },
  panel(el, loading) {
    let panel = el
    let loader = panel.querySelectorAll('loader')
    if (!loader.length) {
      let loaderStr = '<div class="loader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>'
      let loader = document.createElement('div')
      loader.innerHTML = loaderStr.trim()
      panel.insertBefore(loader.firstChild, panel.firstChild)
    }
    if (loading) {
      panel.classList.add(LOADING_CLASS_NAME.panel)
    } else {
      panel.classList.remove(LOADING_CLASS_NAME.panel)
    }
  }
}

Vue.directive('loading', {
  bind: function (el, binding) {
    loadingProcess.apply(el, binding.value)
  },
  update: function (el, binding) {
    loadingProcess.apply(el, binding.value)
  }
})
