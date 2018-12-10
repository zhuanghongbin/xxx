<template>
  <el-dropdown :trigger="trigger" @command="handleCommand">
    <span class="el-dropdown-link" :size="size" :type="type" v-if="skinType">
      {{ title }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-button :size="size" :type="type" v-else>
      {{ title }}<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item  :command="item.value" v-for="item of items" :key="item.value" style="width:100%;" >
        {{ item.title }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    // 模式是线条还是按钮
    skinType: {
      type: Boolean,
      default: false
    },
    // 颜色主题
    type: {
      type: String,
      default: 'primary'
    },
    // 是否点击才下拉
    trigger: {
      type: String,
      default: 'click'
    },
    title: {
      type: String,
      default: '下拉菜单'
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleCommand (command) {
      this.$emit('dropdownMenuOption', command)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-dropdown {
  vertical-align: top;
}
</style>
