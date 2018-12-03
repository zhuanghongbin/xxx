export default { // 模块a 里面也是state, getters, mutations, actions, 调用时： this.$store.a.state.name , ...mapMutations(["a/minus", "a/addParam"]) 所以在调用的时候最好重新命名 => ...mapMutations({"aMinus": "a/minus", "aAddParam": "a/addParam"}),
  namespaced: true, // 进行命名空间设置，如果不设置那么mutations里面的函数跟模块外面的mutations的函数会展平，就是说可以不能调用a模块就可以访问到a模块中的mutations的方法
  state: {
    name: '模块a',
    describe: '描述信息'
  },
  getters: {
    // 参数1： a模块中的state， 参数2：getters所有的方法， 参数3：全局的state
    setDescribe (state, getters, rootState) {
      return state.describe + rootState.count
    }
  },
  mutations: {
    // 参数2是传递的参数
    setName (state, param) {
      state.name = '设置模块a' + param.count
    }
  },
  actions: {
    setName ({state, commit, rootState}) {
      // commit的方法是在a模块中的mutations方法，如果是要调用全局的方法，那么需要设置{root: true}
      commit('minus', rootState.count, {root: true}) // 全局的mutation中的minus方法
      commit('setName', state.name) // a模块中的mutation中的setName方法
    }
  }
}
