import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login.vue'
import systemEnter from '../views/systemEnter.vue'
import user from '../views/system/user.vue'
import userAdd from '../views/system/userAdd.vue'
import userNew from '../views/system/userNew.vue'
import userEdit from '../views/system/userEdit.vue'
import record from '../views/system/record.vue'
import recordAdd from '../views/system/recordAdd.vue'
import recordEdit from '../views/system/recordEdit.vue'
import book from '../views/system/book.vue'
import bookAdd from '../views/system/bookAdd.vue'
import bookEdit from '../views/system/bookEdit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: login
    },
    {
      path: '/systemEnter',
      component: systemEnter
    },
    {
      path: '/user',
      component: {template: '<div><router-view></router-view></div>'},
      children: [
        {
          path: 'list',
          component: user
        }, {
          path: 'add',
          component: userAdd
        }, {
          path: 'new',
          component: userNew
        }, {
          path: 'detail',
          component: userEdit
        }
      ]
    },
    {
      path: '/book',
      component: {template: '<div><router-view></router-view></div>'},
      children: [
        {
          path: 'list',
          component: book
        }, {
          path: 'add',
          component: bookAdd
        }, {
          path: 'detail',
          component: bookEdit
        }
      ]
    },
    {
      path: '/record',
      component: {template: '<div><router-view></router-view></div>'},
      children: [
        {
          path: 'list',
          component: record
        }, {
          path: 'add',
          component: recordAdd
        }, {
          path: 'detail',
          component: recordEdit
        }
      ]
    }
  ]
})
