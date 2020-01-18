import Vue from 'vue'
import Vuex from 'vuex'
import validate from './validate'
import user from './modules/user'
import record from './modules/record'
import book from './modules/book'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    validate,
    user,
    record,
    book
  }
})
