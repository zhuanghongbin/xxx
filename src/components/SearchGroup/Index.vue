<template>
  <span class="search-group">
    <el-button
      class="filter-item"
      type="primary"
      icon="el-icon-search"
      @click="search"
      >
        搜索
      </el-button>
    <el-button
      class="filter-item"
      type="primary"
      icon="el-icon-refresh"
      @click="handelResetData"
      v-if="hasResetBtn"
    >
      重置搜索
    </el-button>
  </span>
</template>
<script>
import {deepClone} from '@/utils'
export default {
  props: {
    // 搜索的数据
    searchData: {
      type: Object,
      required: true
    },
    // 是否展示重置按钮
    hasResetBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tempResetData: deepClone(this.searchData), // 存储搜索的数据
      resetData: {}, // 存储tempResetData的第一次值（重置成这个值）
      resetDataChange: false // tempResetData值变化开关
    }
  },
  watch: {
    tempResetData: {
      handler (val, oldval) {
        this.resetDataChange = true
      },
      deep: true
    }
  },
  methods: {
    handelResetData () {
      if (!this.resetDataChange) {
        this.resetData = deepClone(this.tempResetData)
      }
      this.$emit('handelResetData', this.resetData)
    },
    search () {
      this.$emit('handleFilter')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
