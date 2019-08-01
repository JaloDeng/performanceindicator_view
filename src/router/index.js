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
      path: '/viewemployeeintegral',
      name: 'employeeintegral',
      component: () => import('@/components/EmployeeIntegral')
    },
    {
      path: '/viewintegral',
      name: 'integral',
      component: () => import('@/components/Integral')
    }
  ]
})
