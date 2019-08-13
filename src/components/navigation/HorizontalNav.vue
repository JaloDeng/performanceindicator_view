<template>
  <el-menu mode="horizontal">
    <el-button :icon="collapseIcon" @click="changeCollapse" size="mini" style="float: left;margin: 15px"></el-button>
    <breadcrumbNav style="padding-top: 22px"></breadcrumbNav>
  </el-menu>
</template>

<script>
import breadcrumbNav from '@/components/navigation/BreadcrumbNav'

export default {
  components: {
    breadcrumbNav
  },
  methods: {
    changeCollapse () {
      this.$emit('changeCollapse')
    }
  },
  props: {
    collapseIcon: String
  }
}
</script>

<style>
</style>
