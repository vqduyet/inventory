const processNotify = (type, title, message) => {
  let _notify = window.globalNotify || null
  if (_notify) {
    _notify.addNotify(title, message, type)
  }
}

const showNotify = {
  success(title, message) {
    processNotify('success', title, message)
  },
  info(title, message) {
    processNotify('info', title, message)
  },
  warn(title, message) {
    processNotify('warning', title, message)
  },
  error(title, message) {
    processNotify('danger', title, message)
  }
}

export default showNotify
