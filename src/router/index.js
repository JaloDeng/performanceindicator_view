import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/viewemployee',
          name: '参与者',
          icon: 'el-icon-user',
          component: () => import('@/components/view/Employee')
        },
        {
          path: '/viewemployeeintegral',
          name: '参与者积分',
          icon: 'el-icon-star-on',
          component: () => import('@/components/view/EmployeeIntegral')
        },
        {
          path: '/viewintegral',
          name: '项目积分',
          icon: 'el-icon-star-on',
          component: () => import('@/components/view/Integral')
        }
      ]
    }
  ]
})
