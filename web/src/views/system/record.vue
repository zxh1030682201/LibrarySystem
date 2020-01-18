<template>
  <div>
    <div class="main-content user">
      <div class="content-opration">
        <!-- 头部栏 -->
        <div class="opration-left" >
          <!-- 搜索框 -->
          <el-input
            prefix-icon="el-icon-search"
            class="search-input"
            v-model="search.name"
            @keyup.native="searchRecordList"
            placeholder="搜索书名或借书者"
          ></el-input>
          <el-button class="search-button">
            <i class="el-icon-search"></i>
          </el-button>
        </div>
        <div class="opration-right" style="z-index: 10;">
          <router-link to="/login/">
            <el-button class="button-confirm button-add">退出登录</el-button>
          </router-link>
          <router-link to="/user/list">
            <el-button class="button-confirm button-add">切换到用户</el-button>
          </router-link>
          <router-link to="/book/list">
            <el-button class="button-confirm button-add">切换到书籍</el-button>
          </router-link>
        </div>
      </div>
      <div class="content-table">
        <!-- 表单栏 -->
        <el-table
          class="userTable"
          @selection-change="handleSelectionChange"
          tooltip-effect="light"
          :data="recordListData"
          :row-class-name="setRowClass"
          style="width: 100%"
          border
          height="100%"
        >
          <el-table-column type="index" label="序号" width="70" align="center" sortable></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="bookName" label="书名">
            <template slot-scope="scope">
              <span v-if="scope.row.bookName">{{scope.row.bookName}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="借书者">
            <template slot-scope="scope">
              <span v-if="scope.row.userName">{{scope.row.userName}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column prop="returned" label="是否已归还">
            <template slot-scope="scope">
              <span >{{scope.row.returned}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="borrowTime" label="借书时间" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.borrowTime">{{scope.row.borrowTime}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column prop="returnTime" label="还书时间" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.returnTime">{{scope.row.returnTime}}</span>
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
                v-show="checkLoginAccountName()"
                @click="handleEdit(scope.row)"
              >编辑</a>
              <a
                class="table-btn"
                style="color: red; cursor: pointer"
                v-show="scope.row.returned == false"
                @click="handleDel(scope.row)"
              >还书</a>
              <a
                class="table-btn"
                style="color: #98A9BF; cursor: no-drop"
                v-show="scope.row.returned == true"
              >还书</a>
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
      title="还书"
      width="30%"
      :visible.sync="delHandle.dialogDelVisible"
      :close-on-click-modal="false"
    >
      <span>是否进行还书?</span>
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
  name: "record",
  data() {
    return {
      search: {
        name: '',
        pageIndex: 1,
        pageSize: 20
      },
      pageSizes: [20, 50, 100],
      recordListData: [],
      totalCount: 0,
      delHandle: {
        dialogDelVisible: false
      },
      searchNothing: false,
      moudelHandle: {
        moudel: {
          _id: "",
          returned:"",
          bookName: "",
          userName: "",
          bookId: "",
          userId: "",
          borrowTime: "",
          returnTime:"",
          createTime: "",
          updateTime: ""
        }
      }
    };
  },
  watch: {},
  created() {
    this.getRecordList();
  },
  methods: {
    checkLoginAccountName(){
      return this.getcookie("accountname") == "admin"
    },
    getRecordList() {
      this.searchlooptime++;
      let params ={}
      let func="queryRecord"
      if (this.search.name&& this.getcookie("accountname") == "admin") {
        params.name = this.search.name;
      }
      if(this.getcookie("accountname") !== "admin"){
        params.name = this.getcookie("loginName")
        func="queryUserRecord"
      }
      if(this.search.name && this.getcookie("accountname") !== "admin"){
        params.name = this.getcookie("loginName")
        params.book = this.search.name;
        func="queryUserRecord"
      }
      this.$store
        .dispatch(func, {
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
          const data = res.results;
          console.log(data)
          if (data.length === 0 && this.searchNothing === false) {
            this.searchNothing = true;
            this.handleCurrentChange(1);
          }
          this.recordListData = data;
          this.totalCount = res.totalCount;
        });
    },
    searchRecordList() {
      this.searchNothing = false;
      this.getRecordList();
    },
    setRowClass(row) {
      if (row.rowIndex % 2 !== 0) {
        return "table-row";
      }
    },

    handleSelectionChange(rows) {
      this.selectRoles = rows;
    },
    handleSizeChange(value) {
      this.search.pageSize = value;
      this.getRecordList();
    },
    handleCurrentChange(value) {
      this.search.pageIndex = value;
      this.getRecordList();
    },

    // 处理编辑
    handleEdit(row) {
      this.$router.push({
        path: "/record/detail",
        query: {
          recordInfo: row
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
        .dispatch("deleteRecord", this.moudelHandle.moudel._id)
        .then(res => {
          if (res.data.success === false) {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          } else if (res.data.success === undefined) {
            this.$message({
              message: "删除记录成功",
              type: "success"
            });
            this.delHandle.dialogDelVisible = false;
            this.getRecordList();
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

