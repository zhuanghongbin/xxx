<template>
  <div :class="{active:currentActive}" class="dropdown-menu">
    <div class="dropdown-menu-wrapper">
      <el-button type="primary" @click.stop="clickTitle">{{ title }}
        <i class="el-icon-arrow-down el-icon--right" :class="{'dropdown-menu-icon-active':currentActive, 'dropdown-menu-icon': !currentActive}"></i>
      </el-button>
      <div class="dropdown-menu-item-wrap">
        <div v-for="(item,index) of items" :key="index" class="dropdown-menu-item" @click="optionSelect(item.value)">
          <a v-if="item.href" :href="item.href" target="_blank">{{ item.title }}</a>
          <span v-else>{{ item.title }}</span>
        </div>
        <div class="dropdown-menu-arrow" style="left: 35px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: '下拉菜单'
    }
  },
  data () {
    return {
      currentActive: false
    }
  },
  watch: {
    currentActive (val) {
      this.$emit('update:isActive', val)
    },
    isActive (val) {
      this.currentActive = val
    }
  },
  methods: {
    optionSelect (val) {
      this.$emit('dropdownMenuOption', val)
    },
    clickTitle () {
      this.currentActive = !this.currentActive
    }
  },
  // 点击其他地方dropdown收缩
  beforeMount () {
    this._close = e => {
      // 如果点击发生在当前组件内部，则不处理
      if (this.$el.contains(e.target)) {
        return
      }
      this.currentActive = false
    }
    document.body.addEventListener('click', this._close)
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this._close)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dropdown-menu {
  position: relative;
  z-index: 1;
  display: inline-block;
  vertical-align: top;
  &-wrapper {
    position: relative;
    background: #fff;
  }
  &-item-wrap {
    position: absolute;
    width: 100%;
    padding: 6px 0;
    z-index: -1;
    border: solid 1px #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    opacity: 0;
    transform: translate3d(0, -20px, 0);
    transition: all .28s;
  }
  &-icon{
    transition-duration: 0.3s;
    transform: rotate(0deg);
  }
  &-item {
    width: 100%;
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background-color: #f5f7fa;
      color: #000;
    }
  }
  &-arrow {
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
    top: -6px;
    margin-right: 3px;
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-width: 0 6px 6px;
    border-color: transparent transparent #ebeef5;
    border-style: solid;
    &::after{
      content:' ';
      top: 1px;
      margin-left: -6px ;
      border-bottom-color: #fff;
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-width: 0 6px 6px;
      border-color: transparent transparent #fff;
      border-style: solid;
    }
  }
  &.active {
    .dropdown-menu-wrapper {
      z-index: 1;
    }
    .dropdown-menu-icon-active{
      transition-duration: 0.3s;
      transform: rotate(-180deg);
    }
    .dropdown-menu-item-wrap {
      display: inline-block;
      transition-duration: 0.3s;
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>
