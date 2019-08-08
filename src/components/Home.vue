<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-aside :width="asideWidth">
        <img src="@/assets/logo.png" width="60" height="60">
        <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" style="text-align: left;">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>资料管理</span>
            </template>
            <el-menu-item index="/viewemployee">参与者</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>积分管理</span>
            </template>
            <el-menu-item index="/viewintegral">项目积分</el-menu-item>
            <el-menu-item index="/viewemployeeintegral">参与者积分</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-menu router class="el-menu-demo" mode="horizontal">
            <el-button :icon="collapseIcon" size="mini" @click="changeCollapse" style="float: left;margin-top: 15px"></el-button>
            <el-menu-item index="/">首页</el-menu-item>
            <div style="float: right;">
              <el-submenu index="1">
                <template slot="title">管理员</template>
                <el-menu-item index="1-1">修改密码</el-menu-item>
                <el-menu-item index="1-2">退出</el-menu-item>
              </el-submenu>
            </div>
          </el-menu>
        </el-header>
        <el-main>
          <template>
            <router-view/>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  data () {
    return {
      asideWidth: '250px',
      collapseIcon: 'el-icon-s-fold',
      isCollapse: false
    }
  },
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.collapseIcon = 'el-icon-s-unfold'
        this.asideWidth = '64px'
      } else {
        this.collapseIcon = 'el-icon-s-fold'
        this.asideWidth = '250px'
      }
    }
  }
}
</script>

<style>
.el-main {
  background-color: #f5f7f9;
}
.el-menu {
  border: 0px;
}
.el-header {
  line-height: 60px;
}
.el-aside {
  background-color: #545c64;
}
</style>
