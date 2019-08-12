import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openTabs: [],
    activeIndex: '/'
  },
  mutations: {
    addTabs (state, item) {
      state.openTabs.push(item)
    },
    deleteTabs (state, path) {
      let index = 0
      for (let item of state.openTabs) {
        if (item.path === path) {
          break
        }
        index++
      }
      state.openTabs.splice(index, 1)
    },
    setActiveIndex (state, activeIndex) {
      state.activeIndex = activeIndex
    }
  }
})
