import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      id: 1,
      component: () => import('@/components/Home'),
      hidden: true,
      name: '主页',
      path: '/'
    },
    {
      id: 11,
      children: [
        {
          id: 101,
          component: () => import('@/components/view/Employee'),
          hidden: false,
          icon: 'el-icon-user',
          name: '参与者',
          path: '/employee'
        }
      ],
      component: () => import('@/components/Home'),
      hidden: false,
      icon: 'el-icon-document',
      name: '资料管理',
      path: '/material'
    },
    {
      id: 12,
      children: [
        {
          id: 102,
          component: () => import('@/components/view/Integral'),
          hidden: false,
          icon: 'el-icon-star-off',
          name: '项目积分',
          path: '/integral'
        },
        {
          id: 103,
          component: () => import('@/components/view/EmployeeIntegral'),
          hidden: false,
          icon: 'el-icon-star-off',
          name: '参与者积分',
          path: '/employeeintegral'
        }
      ],
      component: () => import('@/components/Home'),
      hidden: false,
      icon: 'el-icon-star-on',
      name: '积分管理',
      path: '/integral'
    }
  ]
})
