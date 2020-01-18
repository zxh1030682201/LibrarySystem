// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from 'axios'
import VueBlu from 'vue-blu'
import 'snow-element-ui/lib/theme-chalk/index.css'
import 'snow-element-ui/lib/theme-chalk/base.css'
import router from './routes'
import store from './store'
import util from './utils/util.js'
import GlobalConfig from '@/config'
import base from './assets/js/base/base' // 自定义组件
import mainCss from './assets/css/main.css'
import ioamCss from './assets/css/ioam.css'
import commonCss from './assets/css/common.css'
import notification from './utils/notification'
import SnowElementUI from 'snow-element-ui' // 饿了么插件

Vue.config.productionTip = false

Vue.use(base)
Vue.use(axios)
Vue.use(Vuex)
Vue.use(SnowElementUI)
Vue.use(util)
Vue.use(axios)
Vue.use(SnowElementUI)
Vue.use(Vuex)
Vue.use(VueBlu)
Vue.use(notification)
Vue.use(util)
// css
Vue.use(mainCss)
Vue.use(commonCss)
Vue.use(ioamCss)
Vue.use(GlobalConfig, {router, store})

const app = new Vue({
  router,
  store,
  data () {
    return {
      httpStatus: '',
      httpMsg: '',
      httpType: ''
    }
  },
  watch: {
    '$route': 'checkLogin',
    'httpStatus': 'showMsg'
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      // 检查是否存在userId
      const url = this.$route.path
      if (url.indexOf('login') === -1 && url.indexOf('new') === -1 && !this.getcookie('accountname')) {
        // 如果没有登录状态则跳转到登录页
        this.$message({
          message: '请先登录',
          type: 'warning'
        })
        this.$router.push('/')
      }
    },
    showMsg () {
      this.$message({
        message: this.httpMsg,
        type: this.httpType
      })
    }
  },
  render: h => h(App)
}).$mount('#app')

export default app
