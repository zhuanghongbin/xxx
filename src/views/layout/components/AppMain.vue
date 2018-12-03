<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /* 170px = header + footer = 60 + 40 + 70（breadcrumb的高度）*/
  min-height: calc(100vh - 170px);
  width: 100%;
  background:#fff;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
