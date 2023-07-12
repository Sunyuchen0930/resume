import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [{
  path: '/redirect', component: Layout, hidden: true, children: [{
    path: '/redirect/:path(.*)', component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/auth-redirect', component: () => import('@/views/login/auth-redirect'), hidden: true
}, {
  path: '/404', component: () => import('@/views/error-page/404'), hidden: true
}, {
  path: '/401', component: () => import('@/views/error-page/401'), hidden: true
}, {
  path: '/', component: Layout, redirect: '/dashboard', children: [{
    path: 'dashboard',
    component: () => import('@/views/users/dashboard/index'),
    name: 'Dashboard',
    meta: { title: '首页', icon: 'el-icon-s-shop', affix: true }
  }]
},
{
  path: '/index', component: () => import('@/views/users/dashboard/index')
},
{
  path: '/login', component: () => import('@/views/users/login')
},
{
  path: '/register', component: () => import('@/views/users/components/RegisterComponent')
},
{
  path: '/search', component: Layout, children: [{
    path: 'index',
    component: () => import('@/views/users/index'),
    name: 'SearchIndex',
    meta: { title: '岗位检索', icon: 'search' }
  }, {
    path: 'form',
    component: () => import('@/views/users/search/formSearch'),
    name: 'FormSearch',
    hidden: true,
    meta: { title: '表格检索', icon: 'search' }
  }, {
    path: 'advanced',
    component: () => import('@/views/users/search/advancedSearch'),
    name: 'AdvancedSearch',
    hidden: true,
    meta: { title: '高级检索', icon: 'search' }
  }, {
    path: 'results',
    component: () => import('@/views/users/search/results'),
    name: 'SearchResults',
    hidden: true,
    meta: { title: '检索结果' }
  }, {
    path: 'detail',
    component: () => import('@/views/users/search/detail'),
    name: 'SearchDetail',
    hidden: true,
    meta: { title: '检索详情' }
  }]
}, {
  path: '/patent', component: Layout, meta: { title: '我的简历', icon: 'el-icon-edit-outline' }, children: [{
    path: 'dashboard',
    component: () => import('@/views/users/dashboard/index'),
    name: 'Dashboard',
    meta: { title: '岗位匹配', icon: 'el-icon-s-opportunity', affix: true }
  }]
}, {
  path: '/focus', component: Layout, children: [{
    path: 'focus',
    component: () => import('@/views/users/explore/dept/dept.vue'),
    name: 'focus',
    meta: { title: '我的收藏', icon: 'focus' }
  }]
},
{
  path: '/app', component: Layout, meta: { title: '我的申请', icon: 'el-icon-thumb' }, children: [
    {
      path: 'school',
      component: () => import('@/views/users/school.vue'),
      name: 'school',
      meta: { title: '校招岗位', icon: 'el-icon-caret-right' }
    }, {
      path: 'social',
      name: 'social',
      meta: { title: '社招岗位', icon: 'el-icon-caret-right' },
      component: () => import('@/views/users/social.vue')
    }]
},
{
  path: '/dept', component: Layout, meta: { title: '个人信息', icon: 'el-icon-position' }, children: [
    {
      path: 'index',
      component: () => import('@/views/users/resume.vue'),
      name: 'dept',
      meta: { title: '我的简历', icon: 'el-icon-postcard' }
    }, {
      path: 'apply',
      name: 'apply',
      meta: { title: '个人资料', icon: 'el-icon-s-custom' },
      component: () => import('@/views/users/info.vue')
    }]
}]
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }), routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
