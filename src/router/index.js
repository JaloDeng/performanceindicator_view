import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/components/Home')
    },
    {
      path: '/',
      name: 'integral',
      component: () => import('@/components/Integral')
    }
  ]
})
