export default {
  install (Vue, options) {
    Vue.prototype.$addNotifyListener = (messageType, callback) => {
      if (!Vue.prototype.$notifyListeners) {
        Vue.prototype.$notifyListeners = {}
      }
      if (!Vue.prototype.$notifyListeners[messageType]) {
        Vue.prototype.$notifyListeners[messageType] = []
      }
      let replaceIdx = -1
      Vue.prototype.$notifyListeners[messageType].forEach((cb, idx) => {
        if (cb.name === callback.name) {
          replaceIdx = idx
        }
      })
      if (replaceIdx !== -1) {
        Vue.prototype.$notifyListeners[messageType][replaceIdx] = callback
      } else {
        Vue.prototype.$notifyListeners[messageType].push(callback)
      }
    }
  }
}
