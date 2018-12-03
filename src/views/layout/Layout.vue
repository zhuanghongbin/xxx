<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    footer{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: #3e4558;
      left: 180px;
      transition: left .28s;
      z-index: 99;
    }
  }
  // 隐藏sidebar 设置left
  .hideSidebar footer{
    left: 36px !important;
  }
  .main-container{
    // padding: 0 10px;
  }
  .app-el-menu {
    width: 200px;
  }
  .app-main {
    overflow-y: scroll;
    background-color: #f3f7fa;
  }
</style>
<template>
  <div :class="classObj" class="layout" >
    <navbar></navbar>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <!-- <navbar/> -->
      <!-- <tags-view/> -->
      <!-- <transition name="fade-transform" mode="out-in"> -->
      <breadcrumb class="breadcrumb-container" style="margin: 20px 20px 0;"/>
      <!-- </transition> -->
      <app-main/>
    </div>
    <footer>
      <p>@copyright</p>
    </footer>
  </div>
</template>

<script>
// import { storage } from '@/utils/common'
// import axios from 'axios'
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    Breadcrumb
  },
  mixins: [ResizeMixin],
  data () {
    return {}
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {},
  watch: {
    // '$route.path' (newval) {
    //   this.setIndex(newval)
    // }
  },
  mounted () {}
}
</script>
