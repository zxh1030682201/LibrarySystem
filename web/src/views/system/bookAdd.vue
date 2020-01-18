<template>
<div>
  <div class="main-content user detail">
    <div class="content-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="breadcrumb-first">书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item class="breadcrumb-first" :to="{ path: '/book/list' }">书籍列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增书籍</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-opration">
    </div>
    <div class="content-table">
      <div class="title" style="margin-right: 50%;">书籍信息</div>
      <el-form class="userAdd" :rules="moudelHandle.rules" ref="bookForm" :model="moudelHandle.moudel" label-width="80px">
        <el-form-item label="书名" class="is-required" prop="bookName">
          <el-input v-model="moudelHandle.moudel.bookName" placeholder="请输入书名" ></el-input>
        </el-form-item>
        <el-form-item label="书类型"  prop="bookType">
          <el-input v-model="moudelHandle.moudel.bookType" placeholder="请输入书籍类型" ></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="moudelHandle.moudel.author" placeholder="请输入作者"></el-input>
        </el-form-item>
        <el-form-item label="剩余数量" class="is-required" prop="number">
          <el-input v-model="moudelHandle.moudel.number" placeholder="请输入剩余数量"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
           <el-input v-model="moudelHandle.moudel.publisher"  placeholder="请输入出版社"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" prop="publishTime">
           <el-input v-model="moudelHandle.moudel.publishTime"  placeholder="请输入出版日期"></el-input>
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
        bookForm: {
            bookName: "",
            bookType: "",
            author: "",
            number:"",
            publisher: "",
            publishTime: "",
        },
        moudelHandle: {
          dialogFormVisible: false,
          moudel: {
            _id: "",
            bookName: "",
            bookType: "",
            author: "",
            number:"",
            publisher: "",
            publishTime: "",
            createTime: "",
            updateTime: ""
          },
          rules: {
            bookName: [{ required: true, message: '请输入书名', trigger: 'blur' }],
            bookType: [{ required: false, message: '请输入书类型', trigger: 'blur' }],
            author: [{ required: false, message: '请输入作者' , trigger: 'blur' }],
            number: [{ required: true, message: '请输入剩余数量', trigger: 'blur' }],
            publisher: [{ required: false, message: '请输入出版社', trigger: 'blur' }],
            publishTime: [{ required: false, message: '请输入出版时间', trigger: 'blur' }]
          }
        },
        edit: false,
        namePinyin: ''
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
        this.$router.push('/book/list')
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if( this.moudelHandle.moudel.bookName.length!==0&&this.moudelHandle.moudel.number.length!==0){
              this.saveBook(formName)
            }else{
              this.$message.error('请填写书名/数量');
            }
          } else {
            return false
          }
        })
      },
      saveBook (formName) {
        if (this.moudelHandle.moudel._id) {
          // 更新
          return this.$store.dispatch('updateBook', this.moudelHandle.moudel).then((res) => {
            this.$message({
              message: '修改书籍成功',
              type: 'success'
            })
            this.handleClose(formName)
          })
        } else {
          // 新增
          delete this.moudelHandle.moudel._id
          return this.$store.dispatch('addBook', this.moudelHandle.moudel).then((res) => {
            if (res.data.isSuccess === false) {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            } else if (res.data.isSuccess === undefined) {
              this.$message({
                message: '新增书籍成功',
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

