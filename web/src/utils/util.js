export default {
  install (Vue, options) {
    Vue.prototype.getUserAgent = () => {
      var userAgent = navigator.userAgent
      if (userAgent.indexOf('Firefox') > -1) {
        return 'Firefox'
      } else if (userAgent.indexOf('Chrome') > -1) {
        return 'Chrome'
      } else {
        return 'IE'
      }
    }
    Vue.prototype.copyProperties = (target, properties) => {
      let src = {}
      if (properties) {
        for (const p of properties) {
          src[p] = target[p]
        }
      } else {
        for (const prop in target) {
          if (target.hasOwnProperty(prop)) {
            src[prop] = target[prop]
          }
        }
      }
      return src
    }
    Vue.prototype.copyWithIngorePro = (src, target, ignoreProperties = []) => {
      for (let p in target) {
        if (target.hasOwnProperty(p) && ignoreProperties.indexOf(p) < 0 && src[p]) {
          target[p] = src[p]
        }
      }
      return target
    }
    Vue.prototype.clearProperties = (target) => {
      if (typeof target !== 'object') {
        return
      }
      for (const prop in target) {
        if (target.hasOwnProperty(prop)) {
          if (target[prop] instanceof Array) {
            target[prop] = []
          } else if (target[prop] instanceof Object) {
            target[prop] = {}
          } else {
            target[prop] = ''
          }
        }
      }
    }
  }
}
