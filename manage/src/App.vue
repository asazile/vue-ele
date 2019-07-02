<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col class="logo" :span="8" :style="{width:isCollapse?'64px':'240px'}">
          <strong>{{isCollapse?'饿了么':'饿了么后台管理系统'}}</strong>
        </el-col>
        <el-col class="info" :span="8">
          <i
            :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"
            @click="isCollapse=!isCollapse"
          ></i>
        </el-col>
        <el-col :span="8" class="adminInfo">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="cursor:pointer">
              <img src="./assets/u=467058816,1901310550&fm=27&gp=0.jpg" alt>
              <span style="font-size:18px;margin-left: 30px;">{{$store.state.adminName}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="quit">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :style="{width:isCollapse?'auto':'240px'}">
        <el-menu
          :collapse-transition="false"
          default-active="1-1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">管理员设置</span>
            </template>
            <el-menu-item index="1-1" @click="$router.push('/adminLog')">管理员登陆日志</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">店铺管理</span>
            </template>
            <el-menu-item index="2-1" @click="$router.push('/shopType')">店铺类别列表</el-menu-item>
            <el-menu-item index="2-2" @click="$router.push('/shopList')">店铺列表</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="3-1" @click="$router.push('/goodsType')">商品类别列表</el-menu-item>
            <el-menu-item index="3-2" @click="$router.push('/goodsList')">商品列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view v-if="isRouterAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isCollapse: false,
      isRouterAlive: true
    };
  },
  methods: {
    quit() {
      this.$confirm("真的要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("OUT_LOGIN");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 1000px;
}
.el-header {
  padding: 0px !important;
  background: #409eff;
  color: #ffffff;
  .info {
    font-size: 30px;
    line-height: 60px;
  }
  .logo {
    text-align: center;
    width: 240px;
    font-size: 20px;
    line-height: 60px;
    border-right: 1px solid rgba(238, 241, 146, 0.3);
  }
  .adminInfo {
    float: right;
    text-align: right;
    padding-right: 20px;
    line-height: 60px;
    .el-dropdown-link {
      span {
        color: #fff;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
}
.toolbar {
  background: #f4f4f4;
  padding: 10px;
  marign: 20px 0 !important;
}
.el-table th,
.el-table td {
  text-align: center !important;
}
.toolbar .el-form-item {
  margin-bottom: 0px;
}
</style>
