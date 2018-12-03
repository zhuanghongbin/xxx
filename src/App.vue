<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <p>
      <router-link  to="/index">
        <el-button type="primary">
          <i class="iconfont icon-message_fill"></i>
          首页
        </el-button>
      </router-link>
      <router-link to="/about">
        <el-button type="success">
          <i class="iconfont icon-message_fill"></i>
          关于
        </el-button>
      </router-link>
    </p> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #2c3e50;
// }
</style>
