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
            v-model="search.bookName"
            @keyup.native="searchBookList"
            placeholder="搜索书名"
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
          <router-link to="/record/list">
            <el-button class="button-confirm button-add">切换到记录</el-button>
          </router-link>
          <!-- 新增框 -->
          <router-link to="/book/add" v-show="checkLoginAccountName()">
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
          :data="bookListData"
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
          <el-table-column :show-overflow-tooltip="true" prop="bookType" label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.bookType">{{scope.row.bookType}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column prop="author" label="作者">
            <template slot-scope="scope">
              <span v-if="scope.row.author">{{scope.row.author}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column prop="publisher" label="出版社">
            <template slot-scope="scope">
              <span v-if="scope.row.publisher">{{scope.row.publisher}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column prop="publishTime" label="出版时间" min-width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.publishTime">{{scope.row.publishTime}}</span>
              <span v-else>- -</span>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="剩余数量">
            <template slot-scope="scope">
              <span v-if="scope.row.number">{{scope.row.number}}</span>
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
                @click="handleAddRecord(scope.row)"
              >借书</a>
              <a
                class="table-btn"
                style="color: #579ae6; cursor: pointer"
                v-show="checkLoginAccountName()"
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
      <span>是否删除该书籍信息?</span>
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
        bookName: '',
        pageIndex: 1,
        pageSize: 20
      },
      pageSizes: [20, 50, 100],
      bookListData: [],
      totalCount: 0,
      delHandle: {
        dialogDelVisible: false
      },
      searchNothing: false,
      moudelHandle: {
        moudel: {
          _id: "",
          bookName: "",
          bookType: "",
          author: "",
          publisher: "",
          publishTime: "",
          createTime: "",
          updateTime: ""
        }
      }
    };
  },
  watch: {},
  created() {
    this.getBookList();
  },
  methods: {
    checkLoginAccountName(){
      return this.getcookie("accountname") == "admin"
    },
    getBookList() {
      this.searchlooptime++;
      let params = {};
      if (this.search.bookName) {
        params.bookName = this.search.bookName;
      }
      this.$store
        .dispatch("queryBook", {
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
          if (data.length === 0 && this.searchNothing === false) {
            this.searchNothing = true;
            this.handleCurrentChange(1);
          }
          this.bookListData = data;
          this.totalCount = res.totalCount;
        });
    },
    searchBookList() {
      this.searchNothing = false;
      this.getBookList();
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
      this.getBookList();
    },
    handleCurrentChange(value) {
      this.search.pageIndex = value;
      this.getBookList();
    },
    // 处理借书
    handleAddRecord(row) {
      this.$router.push({
        path: "/record/add",
        query: {
          bookInfo: row
        }
      });
    },
    // 处理编辑
    handleEdit(row) {
      this.$router.push({
        path: "/book/detail",
        query: {
          bookInfo: row
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
        .dispatch("deleteBook", this.moudelHandle.moudel._id)
        .then(res => {
          if (res.data.success === false) {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          } else if (res.data.success === undefined) {
            this.$message({
              message: "删除书籍成功",
              type: "success"
            });
            this.delHandle.dialogDelVisible = false;
            this.getBookList();
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

