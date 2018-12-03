import Vue from 'vue'
import Vuex from 'vuex'

import defaultState from './state/state'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'

// import moduleA from './modules/a-modules'
// import moduleB from './modules/b-modules'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: defaultState,
  getters,
  mutations,
  actions,
  modules: {
    app,
    permission,
    tagsView,
    user
  }
  // 模块， 相当于里面又进行了一个vuex
  // modules: {
  //   a: moduleA,
  //   b: moduleB
  // }
})
// 实现vuex的热更替
if (module.hot) {
  // module.hot.accept 表示需要热更替的是哪些文件
  module.hot.accept([
    './state/state',
    './getters/getters',
    './mutations/mutations',
    './actions/actions',
    // './modules/a-modules', // 模块a
    // './modules/b-modules' // 模块b
    './modules/app',
    './modules/permission',
    './modules/tagsView',
    './modules/user'
  ], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newState = require('./state/state').default
    const newGetters = require('./getters/getters').default
    const newMutations = require('./mutations/mutations').default
    const newActions = require('./actions/actions').default
    const app = require('./modules/app').default
    const permission = require('./modules/permission').default
    const tagsView = require('./modules/tagsView').default
    const user = require('./modules/user').default
    // const newModuleA = require('./modules/a-modules').default
    // const newModuleB = require('./modules/b-modules').default
    // 加载新模块
    store.hotUpdate({
      state: newState,
      getters: newGetters,
      mutations: newMutations,
      actions: newActions,
      modules: {
        // a: newModuleA,
        // b: newModuleB
        app,
        permission,
        tagsView,
        user
      }
    })
  })
}

export default store
