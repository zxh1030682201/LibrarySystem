<template>
  <div class="login-bg">
    <img src="../assets/img/bg.jpg" width="100%" height="100%">
    <div class="login-default" >
        <div
        v-for="item in systemList"
        :key="item.index">
          <a @click="enterSystem(item.url)">{{item.name}}</a>
        </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */ 
import {mapState} from 'vuex'
import _ from 'lodash'

export default {
  name: 'loginEnter',
  data () {
    return {
      systemList: [{name:"书籍信息",url:"http://localhost:8080/#/book/list"},{name:"用户信息",url:"http://localhost:8080/#/user/list"},{name:"借书记录",url:"http://localhost:8080/#/record/list"}]
    }
  },
  methods: {
    enterSystem (url) {
      window.location.href = url
    }
  }
}
</script>
<style scoped>
.login-default {
  width: 100%;
  position: absolute;
  top: 50%;
  margin-top: -110px;
}
.login-default div {
  display: inline-block;
  width: 300px;
  height: 220px;
  background: url('../assets/img/sys-bg.png') no-repeat;
  background-size: 100% 100%;
  margin: 0 50px;
}
.login-default div:hover {
  width: 300px;
  height: 220px;
  background: url('../assets/img/sys-hover-bg.png') no-repeat;
  cursor: pointer;
  background-size: 100% 100%;
}
.login-default div:hover a {
  cursor: pointer;
}
.login-default div a {
  position: relative;
  top: 80px;
  font-size: 42px;
  color: #fff;
  text-shadow: 2px 2px 20px #84c46e;
  text-decoration: none;
  padding: 86px 66px;
}
</style>
