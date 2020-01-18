import axiosConfig from './axiosConf'

export default {
  install (Vue, options) {
    Vue.prototype.BaseUrl = axiosConfig.baseUrl
    Vue.prototype.FileBase = axiosConfig.baseUrl + 'file/'
    Vue.prototype.domain = axiosConfig.domain
  }
}
