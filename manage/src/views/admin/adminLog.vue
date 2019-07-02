<template>
  <div>
    <div style="padding-bottom:30px;text-align:center;color:#409EFF" class="toolbar">
      <span>管理员日志列表</span>
      <el-button @click="$router.go(-1)" style="float:right">返回</el-button>
    </div>
    <el-table
      v-loading="$store.state.isLoading"
      :border="true"
      :data="$store.state.admin.adminLog"
      style="width: 100%"
    >
      <el-table-column label="登陆时间" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.logTime | date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理员账号" width="180">
        <template slot-scope="scope">{{scope.row.adminName}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAdmin(scope.row._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="toolbar" style="overflow: hidden;">
      <pageInfo action-name="adminLog"></pageInfo>
      <!-- <el-pagination 
        background 
        layout="prev, pager, next" 
        @current-change="(pageIndex)=>{$store.dispatch('adminLog',{pageIndex})}"
        :page-size="$store.state.pageSize"
        :total="$store.state.total">
      </el-pagination>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-log",
  data() {
    return {};
  },
  inject: ["reload"],
  mounted() {
    this.$store.dispatch("adminLog");
  },

  methods: {
    deleteAdmin(id) {
      this.$axios.delete("/deleteAdmin", {
          data: {
            id
          }
        })
        .then(data => {
          this.reload();
          // this._actions.adminLog[0]();
        });
    }
  }
};
</script>
<style scoped>
</style>