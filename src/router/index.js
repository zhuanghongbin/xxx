import Vue from 'vue'
import Router from 'vue-router'
import {constantRouterMap as routes} from '@/router/routes.js'

// 挂载vue-router
Vue.use(Router)

export default new Router({
  routes,
  // mode: 'history',
  // base: '/base/', // 为所有路径前面添加一个基本的文本配置  http://localhost:8080/base/index
  linkActiveClass: 'active-link', // 点击进行路由跳转时那个路由会添加active-link
  linkExactActiveClass: 'exact-active-link', // 路由路径完全匹配是点击的时候会有exact-active-link
  scrollBehavior (to, from, savedPosition) { // 记录路由页面滚动的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
  // fallback: true // 如果浏览器不支持history模式，那么自动帮我们改为hash模式
})
