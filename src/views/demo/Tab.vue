<template>
  <div class="app-container">
    <el-button type="primary" @click="toggleShowCheckbox">{{showCheckbox? '列表展示': '编辑'}}</el-button>
    <el-button type="danger" @click="toggleDefaultExpandAll">{{defaultExpandAll? '收缩': '展开'}}</el-button>
    <el-button type="success" @click="toggleShowFilter">（非编辑状态）是否有搜索功能</el-button>
    <linebar status="primary"/>
    <!-- tree 组件 -->
    <div v-if="reload">
      <tab-comp
        ref="tab"
      ></tab-comp>
    </div>
    <linebar status="primary" />
    <div>
      <p>获取选中的数据：</p>
      <p>{{checkedKeys}}</p>
    </div>
  </div>
</template>
<script>
import TabComp from '@/components/Tab'
import linebar from '@/components/Linebar'

export default {
  name: 'Tree',
  components: {
    TabComp,
    linebar
  },
  filters: {
  },
  data () {
    return {
      reload: true,
      data: [
      ]
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
    // 强制刷新子组件
    handleReLoad () {
      // 强制更新子组件,实际项目中应该用不到，这里只是让tree组件编辑和展示的切换
      this.reload = false
      this.$nextTick(() => (this.reload = true))
    }
  }
}
</script>
<style scoped>
</style>
