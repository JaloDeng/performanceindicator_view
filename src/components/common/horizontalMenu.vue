<template>
  <el-menu mode="horizontal">
    <el-button :icon="collapseIcon" @click="changeCollapse" size="mini" style="float: left;margin: 15px"></el-button>
  </el-menu>
</template>

<script>
export default {
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
