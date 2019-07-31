import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Home')
    },
    {
      path: '/viewemployee',
      name: 'employee',
      component: () => import('@/components/Employee')
    },
    {
      path: '/viewintegral',
      name: 'integral',
      component: () => import('@/components/Integral')
    }
  ]
})
