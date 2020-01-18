<template>
<div>
  <div class="main-content user detail">
    <div class="content-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb-first">借书记录管理</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb-first" :to="{ path: '/book/list' }">借书记录列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增借书记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-opration">
    </div>
    <div class="content-table">
      <div class="title" style="margin-right: 50%;">借书信息</div>
      <el-form class="userAdd" :rules="moudelHandle.rules" ref="bookForm" :model="moudelHandle.moudel" label-width="80px">
        <el-form-item label="书名" class="is-required" prop="bookName">
          <el-input v-model="moudelHandle.moudel.bookName" placeholder="请输入书名" :disabled="!checkLoginAccountName()"></el-input>
        </el-form-item>
        <el-form-item label="借书者" class="is-required" prop="userName">
          <el-input v-model="moudelHandle.moudel.userName" placeholder="请输入借书者" :disabled="!checkLoginAccountName()"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer userAdd-footer" style="margin-left: 20%;">
        <el-button class="button-cancel" @click="handleClose('bookForm')">返 回</el-button>
        <el-button class="button-confirm" @click="submitForm('bookForm')">保 存</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/*eslint-disable */
  import vPinyin from '../../assets/js/pinyin/chineseTopinyin'
  export default {
    computed: {
    },
    data () {
      return {
        recordForm: {
            bookName: "",
            userName: "",
        },
        moudelHandle: {
          dialogFormVisible: false,
          moudel: {
            _id: "",
            returned:false,
            bookName: "",
            userName: "",
            bookId:"",
            userId:""
          },
          rules: {
            bookName: [{ required: true, message: '请输入书名', trigger: 'blur' }],
            userName: [{ required: true, message: '请输入书类型', trigger: 'blur' }]
          }
        },
        edit: false,
        namePinyin: ''
      }
    },
    watch: {
    },
    created () {
        if (this.$route.query&&this.$route.query.bookInfo) {
        let bookInfo = this.$route.query.bookInfo
        this.moudelHandle.moudel.bookName = bookInfo.bookName
        this.moudelHandle.moudel.bookId = bookInfo._id
        if(this.getcookie("accountname")!=="admin"){
          this.moudelHandle.moudel.userName=this.getcookie("loginName")
        }
      }
    },
    methods: {
      checkLoginAccountName(){
        return this.getcookie("accountname") == "admin"
      },
      //关闭
      handleClose (formName) {
        this.clearProperties(this.moudelHandle.moudel)
        this.$refs[formName].resetFields()
        this.$router.push('/book/list')
      },
      handleClose2 (formName) {
        this.clearProperties(this.moudelHandle.moudel)
        this.$refs[formName].resetFields()
        this.$router.push('/book/list')
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if( this.moudelHandle.moudel.bookName.length!==0&&this.moudelHandle.moudel.userName.length!==0){
              this.saveRecord(formName)
            }else{
              this.$message.error('请填写书籍名称/借书人');
            }
          } else {
            return false
          }
        })
      },
      saveRecord (formName) {
        if (this.moudelHandle.moudel._id) {
          // 更新
          return this.$store.dispatch('updateRecord', this.moudelHandle.moudel).then((res) => {
            this.$message({
              message: '修改借书记录成功',
              type: 'success'
            })
            this.handleClose(formName)
          })
        } else {
          // 新增
          delete this.moudelHandle.moudel._id
          return this.$store.dispatch('addRecord', this.moudelHandle.moudel).then((res) => {
            if (res.data.isSuccess === false) {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            } else if (res.data.isSuccess === undefined) {
              this.$message({
                message: '新增借书记录成功',
                type: 'success'
              })
              this.handleClose2(formName)
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

