import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/viewintegral',
      name: 'integral',
      component: () => import('@/components/Integral')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/components/Home')
    }
  ]
})
