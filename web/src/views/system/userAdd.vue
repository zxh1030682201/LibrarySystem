<template>
<div>
  <div class="main-content user detail">
    <div class="content-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb-first">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb-first" :to="{ path: '/user/list' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-opration">
    </div>
    <div class="content-table">
      <div class="title" style="margin-right: 50%;">用户信息</div>
      <el-form class="userAdd" :rules="moudelHandle.rules" ref="userForm" :model="moudelHandle.moudel" label-width="80px">
        <el-form-item label="名字" class="is-required" prop="name">
          <el-input v-model="moudelHandle.moudel.name" placeholder="请设置名字" ></el-input>
        </el-form-item>
        <el-form-item label="用户名" class="is-required" prop="userName">
          <el-input v-model="moudelHandle.moudel.userName" placeholder="请设置用户名" ></el-input>
        </el-form-item>
        <el-form-item label="密码" class="is-required" prop="userPwd">
          <el-input v-model="moudelHandle.moudel.userPwd" placeholder="请设置密码" ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="moudelHandle.moudel.tel" placeholder="请输入联系电话" ></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
           <el-input v-model="moudelHandle.moudel.email"  placeholder="请输入联系邮箱"></el-input>
        </el-form-item>
        <el-form-item label="可借书数" prop="balance">
           <el-input v-model="moudelHandle.moudel.balance"  placeholder="请输入可借书数（默认为5）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer userAdd-footer" style="margin-left: 20%;">
        <el-button class="button-cancel" @click="handleClose('userForm')">返 回</el-button>
        <el-button class="button-confirm" @click="submitForm('userForm')">保 存</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/*eslint-disable */
  export default {
    computed: {
    },
    data () {
      var checkEmail = (rules, value, callback) => {
        if(this.moudelHandle.moudel.email.length !== 0){
          if(!/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(value)){
            callback('请输入正确的邮箱')
          }
          else {
            callback()
          }
        } else {
          callback()
        }
      }
      var checkTel = (rules, value, callback) => {
        if(this.moudelHandle.moudel.tel.length !== 0){
          if(!/^0?1[3|4|5|7|8|6|9][0-9]\d{4}\d{4}$/.test(value)){
            callback('请输入正确的电话号码')
          } 
          else {
            callback()
          }
          }else {
          callback()
        }
      }
      return {
        userForm: {
          name: '',
          userName:'',
          userPwd:'',
          tel: '',
          email: '',
          balance: '',
        },
        moudelHandle: {
          dialogFormVisible: false,
          moudel: {
            _id: '',
            name: '',
            userName:'',
            userPwd:'',
            tel: '',
            email: '',
            balance:5
          },
          rules: {
            name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
            userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            tel: [{ required: false, message: '请输入联系电话' }, {validator: checkTel }],
            email: [{ required: false, message: '请输入联系邮箱' }, {validator: checkEmail }],
            userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            balance: [{ required: false, message: '请输入可借书数', trigger: 'blur' }],
          }
        }
      }
    },
    watch: {
    },
    created () {
    },
    methods: {
      //关闭
      handleClose (formName) {
        this.clearProperties(this.moudelHandle.moudel)
        this.$refs[formName].resetFields()
        this.$router.push('/user/list')
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if( this.moudelHandle.moudel.userName.length!==0&&this.moudelHandle.moudel.name.length!==0&&this.moudelHandle.moudel.userPwd.length!==0){
              this.saveUser(formName)
            }else{
              this.$message.error('请填写名字/用户名/密码');
            }
          } else {
            return false
          }
        })
      },
      saveUser (formName) {
        if (this.moudelHandle.moudel._id) {
          // 更新
          return this.$store.dispatch('updateUser', this.moudelHandle.moudel).then((res) => {
            this.$message({
              message: '修改用户成功',
              type: 'success'
            })
            this.handleClose(formName)
          })
        } else {
          // 新增
          delete this.moudelHandle.moudel._id
          return this.$store.dispatch('addUser', this.moudelHandle.moudel).then((res) => {
            if (res.data.isSuccess === false) {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            } else if (res.data.isSuccess === undefined) {
              this.$message({
                message: '新增用户成功',
                type: 'success'
              })
              this.handleClose(formName)
            }
          })
        }
      }
    }
  }
</script>

<style>
.detail .content-table {
  height: calc(100vh - 125px) !important;
  background-color: white;
  overflow-y: auto;
}
.userAdd .el-switch__label {
position: absolute;
display: none;
color: #fff;
}
/*打开时文字位置设置*/
.userAdd .el-switch__label--right {
z-index: 1;
right: 22px;
}
/*关闭时文字位置设置*/
.userAdd .el-switch__label--left {
z-index: 1;
left: 22px;
}
/*显示文字*/
.userAdd .el-switch__label.is-active {
display: block;
}
.userAdd .el-switch .el-switch__core, .userTable .el-switch .el-switch__label {
width: 60px !important;
}
.userAdd {
  margin-left: 80px;
}
.userAdd .el-form-item{
  margin-top: 25px;
}
.userAdd .el-input {
  float: left;
  width: 352px;
}
.userAdd .el-select {
  float: left;
}
.userAdd .el-radio-group {
  float: left;
  margin-top: 13px;
}
.userAdd .el-textarea {
  float: left;
  width: 352px;
}
.userAdd-footer {
  float: left;
  margin-left: 405px;
   margin-top: 40px;
}
</style>

