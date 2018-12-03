<template>
  <div>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText"
      v-if="showFilter"
    >
    </el-input>
    <el-tree
      :ref="nodeName"
      :data="data"
      :props="defaultProps"
      :node-key="nodeKey"
      :default-checked-keys="defaultCheckedKeys"
      :show-checkbox="showCheckbox"
      :default-expand-all="defaultExpandAll"
      @check-change="checkChange"
      :filter-node-method="filterNode"
      :render-content="renderContent"
    ></el-tree>
  </div>
</template>

<script>
export default {
  props: {
    showFilter: {
      type: Boolean,
      default: false
    },
    nodeName: {
      type: String,
      default: 'tree'
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 设置节点映射的key, 默认是id
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 选中的节点
    defaultCheckedKeys: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 编辑或列表展示
    showCheckbox: {
      type: Boolean,
      default: false
    },
    // 展开收缩
    defaultExpandAll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filterText: '',
      checkedKeys: []
    }
  },
  watch: {
    checkedKeys (val) {
      this.$emit('treeChange', val)
    },
    filterText (val) {
      this.$refs[this.nodeName].filter(val)
    }
  },
  methods: {
    checkChange (data) {
      this.checkedKeys = this.$refs[this.nodeName].getCheckedKeys()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 自定义图标 根据data 数据结构中的icon值改变
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <i class={data.icon}></i>
          <span style="margin-left:5px;">
            {node.label}
          </span>
        </span>
      )
    }
  },
  created () {
    this.checkedKeys = this.defaultCheckedKeys
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
