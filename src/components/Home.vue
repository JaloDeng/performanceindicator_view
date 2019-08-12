<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <asideMenu :asideWidth="asideWidth" :isCollapse="isCollapse"></asideMenu>
      <el-container>
        <el-header>
          <headerMenu :collapseIcon="collapseIcon" v-on:changeCollapse="changeCollapse"></headerMenu>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headerMenu from '@/components/common/horizontalMenu'
import asideMenu from '@/components/common/verticalMenu'

export default {
  components: {
    asideMenu,
    headerMenu
  },
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
        this.asideWidth = '0px'
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
.el-header {
  line-height: 60px;
}
</style>
