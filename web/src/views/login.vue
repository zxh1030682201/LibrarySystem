<template>
  <div class="login-bg">
    <!-- <img src="../assets/img/bg.jpg" width="100%" height="100%" alt="背景图"> -->
    <div class="login-body">
      <div class="login-title">
        <h2>图书馆管理系统</h2>
      </div>
      <div class="login-form">
        <div class="login-input">
          <el-form
            :model="account"
            :rules="rules"
            ref="loginForm"
            label-position="left"
            label-width="0px"
          >
            <el-form-item prop="accountname">
              <el-input
                autofocus
                type="text"
                v-model="account.accountname"
                auto-complete="off"
                placeholder="请输入账号"
                @keyup.enter.native="loginHandle('loginForm')"
              >
                <template slot="prepend" class="usePswLabel">账号</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="account.password"
                auto-complete="off"
                placeholder="请输入密码"
                @keyup.enter.native="loginHandle('loginForm')"
              >
                <template slot="prepend" class="usePswLabel">密码</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox
                v-model="isRememberPW"
                class="remember"
                v-on:click="rememberPasswdHandle($event)"
              >记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="login-button"
                @click.native.prevent="loginHandle('loginForm')"
                :loading="logining"
              >登录</el-button>
              <router-link to="/user/new">
                <el-button class="login-button">注册账号</el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  mounted() {},
  data() {
    var checkEmailAndTel = (rules, value, callback) => {
      callback();
    };
    return {
      isRememberPW: false,
      checkcount: 0,
      logining: false,
      account: {
        accountname: "",
        password: ""
      },
      rules: {
        accountname: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          },
          {
            validator: checkEmailAndTel
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      dialogVisible: false
    };
  },
  created() {
    console.log(this.getcookie("accountname"), "用户名");
    console.log(this.getcookie("isRememberPW"), "记住密码？");
    if (this.getcookie("isRememberPW") === "true") {
      this.isRememberPW = true;
      this.account.accountname = this.getcookie("accountname");
      this.account.password = this.getcookie("password");
    } else {
      this.isRememberPW = false;
      this.account.accountname = this.getcookie("accountname");
    }
  },
  methods: {
    loginHandle(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    login() {
      return this.$store.dispatch("login", this.account).then(res => {
        if (res.data.message) {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        } else if (res.data.isSuccess === undefined) {
          const data = res.data;
          this.savecookie("accountname", this.account.accountname, 1);
          this.savecookie("accountId", data._id, 1);
          if (this.isRememberPW) {
            this.savecookie("password", this.account.password, 1);
          }
          this.savecookie("isRememberPW", this.isRememberPW);
          this.savecookie("loginName", data.name, 1);
          console.log(data.name)
          this.$router.push("/systemEnter");
        }
      });
    }
  }
};
</script>

<style <style lang="stylus">
.copyright {
  position: fixed;
  bottom: 20px;
  left: 50%;
  width: 650px;
  margin-left: -325px;
  color: #fff;
  font-size: 12px;
}

@media screen and (min-height: 670px) {
  .login-body {
    width: 100%;
    padding: 80px 0;
  }
}

@media screen and (min-height: 600px) and (max-height: 670px) {
  .login-body {
    padding: 50px 0;
  }
}

@media screen and (min-height: 540px) and (max-height: 600px) {
  .login-body {
    padding: 20px 0;
  }
}

@media screen and (min-height: 500px) and (max-height: 540px) {
  .login-body {
    padding: 0;
  }
}

@media screen and (max-height: 500px) {
  .login-body {
    padding: 40px 0;
  }
}

.login-body .el-input {
  margin-top: 20px;
}

.login-body .remember[data-v-0ec7b904] {
  margin-top: 0;
  color: #fff;
}

.login-title {
  width: 100%;
  height: 80px;
  font-size: 28px;
  text-align: center;
  color: #fff;
  margin-bottom: 10px;
}

.login-form {
  width: 460px;
  margin: 0 auto;
  padding: 0 0 20px;
  background: url('../assets/img/rectangle.png') no-repeat;
  background-size: 100% 100%;
}

.login-input {
  width: 100%;
  height: 100%;
}

.login-body .el-form-item {
  margin-top: 20px;
  margin-bottom: 10px;
}

.login-body .remember {
  float: left;
  /* margin-top: 18px!important; */
  color: #fff !important;
}

.login-bg .el-form-item__content {
  width: 380px;
  margin: 0 auto !important;
  padding-top: 10px;
}

.remember .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #fff;
}

.login-button {
  width: 100%;
  background: #0daf9c;
  border: none;
  font-size: 18px;
}

.login-button:hover {
  width: 100%;
  background: #0bb9a5;
  box-shadow: 0px 0px 4px 0px #0bb9a5;
}
</style>
