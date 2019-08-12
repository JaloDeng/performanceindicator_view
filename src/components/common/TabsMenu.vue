<template>
  <el-tabs v-model="activeIndex" type="card" closable v-if="openTabs.length" @tab-click="tabClick" @tab-remove="tabRemove">
    <el-tab-pane :key="item.name" v-for="item in openTabs" :label="item.name" :name="item.path">
      <router-view/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  computed: {
    activeIndex: {
      get () {
        return this.$store.state.activeIndex
      },
      set (val) {
        this.$store.commit('setActiveIndex', val)
      }
    },
    openTabs () {
      return this.$store.state.openTabs
    }
  },
  data () {
    return {
    }
  },
  methods: {
    tabClick (tab) {
      this.$router.push(this.activeIndex)
    },
    tabRemove (name) {
      this.$store.commit('deleteTabs', name)
      if (this.activeIndex === name) {
        if (this.openTabs && this.openTabs.length >= 1) {
          this.$store.commit('setActiveIndex', this.openTabs[this.openTabs.length - 1].path)
          this.$router.push(this.activeIndex)
        }
      }
    }
  },
  mounted () {
    this.$router.push('/')
  },
  watch: {
    $route (to, from) {
      let flag = false
      for (let item of this.openTabs) {
        if (item.path === to.path) {
          flag = true
          break
        }
      }
      if (!flag && to.path !== '/') {
        this.$store.commit('addTabs', {name: to.name, path: to.path})
      }
      this.$store.commit('setActiveIndex', to.path)
    }
  }
}
</script>

<style>
</style>
