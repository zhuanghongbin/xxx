/**
 * 如果是菜单级别的话，并且有多个子菜单，那么一个主菜单作为一个模块（单独起一个路由模块文件，例如：
 *  - 账户中心
 *    - 个人账号
 *    - 企业账号
 * 如果是单个页面，并且是同步路由，那么可以写在静态路由配置中
 */
/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/Index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/Index'),
    hidden: true
  },
  {
    path: '/forget',
    component: () => import('@/views/forget/Index'),
    hidden: true
  },
  {
    path: '/regist',
    component: () => import('@/views/regist/Index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/Authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'iconfont icon-message_fill', noCache: true }
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'demo',
      icon: 'iconfont icon-message_fill',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'countto',
        component: () => import('@/views/demo/CountTo'),
        name: 'CountTo',
        meta: {
          title: '数字动画',
          roles: ['admin']
        }
      },
      {
        path: 'index',
        component: () => import('@/views/demo/Index'),
        name: 'Index',
        meta: {
          title: '混合demo',
          roles: ['admin']
        }
      },
      {
        path: 'tree',
        component: () => import('@/views/demo/Tree'),
        name: 'Tree',
        meta: {
          title: 'Tree组件',
          roles: ['admin']
        }
      },
      {
        path: 'tab',
        component: () => import('@/views/demo/Tab'),
        name: 'Tab',
        meta: {
          title: 'Tab组件',
          roles: ['admin']
        }
      }
    ]
  }
  // {
  //   path: '/',
  //   redirect: '/index'
  // }, {
  //   path: '/index',
  //   name: 'HelloWorld',
  //   component: () => import('@/views/HelloWorld')
  // }, {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('@/views/About')
  // }
]

export const asyncRouterMap = [
  {
    path: '/account',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/account/Index'),
        name: 'Account',
        meta: {
          title: '账号管理',
          icon: 'iconfont icon-message_fill',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/sysmessage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/sysMessage/Index'),
        name: 'SysMessage',
        meta: {
          title: '系统消息',
          icon: 'iconfont icon-message_fill',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '权限设置页面',
      icon: 'iconfont icon-message_fill',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '页面权限设置',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限设置'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
