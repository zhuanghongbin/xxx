export default { // 模块b
  namespaced: true,
  state: {
    name: '模块b'
  },
  mutations: {
    setName (state) {
      state.name = '设置模块b'
    }
  },
  actions: {
    testAction ({commit}) {
      commit('a/setName', '测试', {root: true})
    }
  }
}
