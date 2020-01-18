<template>
  <div>
    <div class="main-content user">
      <div class="content-opration">
        <!-- 头部栏 -->
        <div class="opration-left">
          <!-- 搜索框 -->
          <el-input
            prefix-icon="el-icon-search"
            class="search-input"
            v-model="search.userName"
            @keyup.native="searchUserList"
            placeholder="搜索用户"
          ></el-input>
          <el-button class="search-button">
            <i class="el-icon-search"></i>
          </el-button>
        </div>
        <div class="opration-right" style="z-index: 10;">
          <router-link to="/login/">
            <el-button class="button-confirm button-add">退出登录</el-button>
          </router-link>
          <router-link to="/book/list">
            <el-button class="button-confirm button-add">切换到书籍</el-button>
          </router-link>
          <router-link to="/record/list">
            <el-button class="button-confirm button-add">切换到记录</el-button>
          </router-link>
          <!-- 新增框 -->
          <router-link to="/user/add" v-show="checkLoginAccountName()">
            <el-button class="button-confirm button-add">新增</el-button>
          </router-link>
        </div>
      </div>
      <div class="content-table">
        <!-- 表单栏 -->
        <el-table
          class="userTable"
          @selection-change="handleSelectionChange"
          tooltip-effect="light"
          :data="userListData"
          :row-class-name="setRowClass"
          style="width: 100%"
          border
          height="100%"
        >
          <el-table-column type="index" label="序号" width="70" align="center" sortable></el-table-column>
          <el-table-column prop="name" label="名字">
            <template slot-scope="scope">
              <span v-if="scope.row.name">{{scope.row.name}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="userName" label="用户名">
            <template slot-scope="scope">
              <span v-if="scope.row.userName">{{scope.row.userName}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="tel" label="联系电话">
            <template slot-scope="scope">
              <span v-if="scope.row.tel">{{scope.row.tel}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="email" label="联系邮箱">
            <template slot-scope="scope">
              <span v-if="scope.row.email">{{scope.row.email}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="balance" label="可借书数">
            <template slot-scope="scope">
              <span v-if="scope.row.balance">{{scope.row.balance}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.createTime">{{scope.row.createTime}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.updateTime">{{scope.row.updateTime}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="200">
            <template slot-scope="scope">
              <a
                class="table-btn"
                style="color: #579ae6; cursor: pointer"
                @click="handleEdit(scope.row)"
              >编辑</a>
              <a
                class="table-btn"
                style="color: #98A9BF; cursor: pointer"
                v-show="checkLoginAccountName()"
                @click="handleDel(scope.row)"
              >删除</a>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination-block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="pageSizes"
            :page-size="search.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- 删除对话框 -->
    <el-dialog
      title="删除"
      width="30%"
      :visible.sync="delHandle.dialogDelVisible"
      :close-on-click-modal="false"
    >
      <span>是否删除该用户?</span>
      <div slot="footer" class="dialog-footer">
        <el-button class="button-cancel" @click="delHandle.dialogDelVisible = false">取消</el-button>
        <el-button class="button-confirm" @click="delConfirm">确认</el-button>
      </div>
    </el-dialog>
    <!-- 删除对话框 -->
  </div>
</template>

<script>
/*eslint-disable */
export default {
  name: "book",
  data() {
    return {
      search: {
        userName: '',
        pageIndex: 1,
        pageSize: 20
      },
      pageSizes: [20, 50, 100],
      userListData: [],
      totalCount: 0,
      delHandle: {
        dialogDelVisible: false
      },
      searchNothing: false,
      moudelHandle: {
        moudel: {
          _id: "",
          name: "",
          userName: "",
          userPwd: "",
          tel: "",
          email: "",
          balance:0,
          createTime: "",
          updateTime: ""
        }
      }
    };
  },
  watch: {},
  created() {
    this.getUserList();
  },
  methods: {
    checkLoginAccountName(){
      return this.getcookie("accountname") == "admin"
    },
    //查询用户信息
    getUserList() {
      this.searchlooptime++;
      let params = {};
      if (this.search.userName && this.getcookie("accountname") == "admin") {
        params.userName = this.search.userName;
      }
      if(this.getcookie("accountname") !== "admin"){
        params.name = this.getcookie("loginName")
        console.log(params.name)
      }
      this.$store
        .dispatch("queryUser", {
          params: params,
          page: {
            pageSize: this.search.pageSize,
            pageIndex: this.search.pageIndex,
            sort: {
              updateTime: -1
            }
          },
          populate: []
        })
        .then(res => {
          console.log("res "+JSON.stringify(res))
          const data = res.results;
          if (data.length === 0 && this.searchNothing === false) {
            this.searchNothing = true;
            this.handleCurrentChange(1);
          }
          this.userListData = data;
          this.totalCount = res.totalCount;
        });
    },
    //查询用户信息
    searchUserList() {
      this.searchNothing = false;
      this.getUserList();
    },
    setRowClass(row) {
      if (row.rowIndex % 2 !== 0) {
        return "table-row";
      }
    },

    //处理分页选择
    handleSelectionChange(rows) {
      this.selectRoles = rows;
    },
    handleSizeChange(value) {
      this.search.pageSize = value;
      this.getUserList();
    },
    handleCurrentChange(value) {
      this.search.pageIndex = value;
      this.getUserList();
    },

    // 处理编辑
    handleEdit(row) {
      this.$router.push({
        path: "/user/detail",
        query: {
          userInfo: row
        }
      });
    },

    // 处理删除
    handleDel(row) {
      this.delHandle.dialogDelVisible = true;
      this.moudelHandle.moudel._id = row._id;
    },
    // 删除确认
    delConfirm() {
      return this.$store
        .dispatch("deleteUser", this.moudelHandle.moudel._id)
        .then(res => {
          if (res.data.success === false) {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          } else if (res.data.success === undefined) {
            this.$message({
              message: "删除用户成功",
              type: "success"
            });
            this.delHandle.dialogDelVisible = false;
            this.getUserList();
          }
        });
    }
  }
};
</script>

<style>
.user .el-autocomplete-suggestion.el-popper {
  width: 300px !important;
}
.user .search-input {
  max-width: 300px !important;
}
.el-autocomplete {
  width: 100% !important;
}
.userTable .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/*打开时文字位置设置*/
.userTable .el-switch__label--right {
  z-index: 1;
  right: -10px;
}
/*关闭时文字位置设置*/
.userTable .el-switch__label--left {
  z-index: 1;
  left: 20px;
}
/*显示文字*/
.userTable .el-switch__label.is-active {
  display: block;
}
.userTable.el-switch .el-switch__core,
.userTable .el-switch .el-switch__label {
  width: 50px !important;
}
.opration-left .el-range-separator {
  margin-top: -7px;
}
</style>

