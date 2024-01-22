const processToast = (message, options) => {
  let _toast = window.globalToast || null
  if (_toast) {
    _toast.addToast(message, options)
  }
}

const showToast = {
  success(title, message) {
    processToast(message, { variant: 'success', title: title })
  },
  info(title, message) {
    processToast(message, { variant: 'info', title: title })
  },
  warn(title, message) {
    processToast(message, { variant: 'warning', title: title })
  },
  error(title, message) {
    processToast(message, { variant: 'danger', title: title })
  }
}

export default showToast
