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
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/viewemployee',
          name: 'employeeChildren',
          component: () => import('@/components/view/Employee')
        }
      ]
    },
    {
      path: '/viewemployeeintegral',
      name: 'employeeintegral',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/viewemployeeintegral',
          name: 'employeeChildren',
          component: () => import('@/components/view/EmployeeIntegral')
        }
      ]
    },
    {
      path: '/viewintegral',
      name: 'integral',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/viewintegral',
          name: 'employeeChildren',
          component: () => import('@/components/view/Integral')
        }
      ]
    }
  ]
})
