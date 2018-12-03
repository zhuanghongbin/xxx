<template>
  <div class="app-container">
    <el-button type="primary" @click="toggleShowCheckbox">{{showCheckbox? '列表展示': '编辑'}}</el-button>
    <el-button type="danger" @click="toggleDefaultExpandAll">{{defaultExpandAll? '收缩': '展开'}}</el-button>
    <el-button type="success" @click="toggleShowFilter">（非编辑状态）是否有搜索功能</el-button>
    <linebar status="primary"/>
    <!-- tree 组件 -->
    <div v-if="reload">
      <tree-comp
        ref="tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        :default-checked-keys="defaultCheckedKeys"
        :show-checkbox="showCheckbox"
        :default-expand-all="defaultExpandAll"
        @treeChange="treeChange"
        :showFilter="isShowFilter"
      ></tree-comp>
    </div>
    <linebar status="primary" />
    <div>
      <p>获取选中的数据：</p>
      <p>{{checkedKeys}}</p>
    </div>
  </div>
</template>
<script>
import TreeComp from '@/components/Tree'
import linebar from '@/components/Linebar'

export default {
  name: 'Tree',
  components: {
    TreeComp,
    linebar
  },
  filters: {
  },
  data () {
    return {
      reload: true,
      data: [
        {
          id: 1,
          label: '一级 1',
          icon: 'el-icon-success', // 自定义图标显示
          children: [{
            id: 4,
            label: '二级 1-1',
            icon: 'iconfont icon-message_fill', // 自定义图标显示
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1',
            children: [{
              id: 11,
              label: '三级 2-1-1'
            }]
          }, {
            id: 6,
            label: '二级 2-2',
            children: [{
              id: 12,
              label: '三级 2-2-1'
            }]
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1',
            children: [{
              id: 13,
              label: '三级 3-1-1'
            }]
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
              id: 14,
              label: '三级 3-2-1'
            }]
          }]
        },
        {
          id: 15,
          label: '一级 4',
          children: [{
            id: 16,
            label: '二级 4-1'
          }, {
            id: 17,
            label: '二级 4-2'
          }, {
            id: 18,
            label: '二级 4-3'
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultCheckedKeys: [], // 默认数据
      showCheckbox: true, // 是否可以编辑
      defaultExpandAll: true, // 全部展开，默认展开
      checkedKeys: [], // 选中的数据
      isShowFilter: true // 是否展示过滤器
    }
  },
  watch: {
  },
  created () {
    // 设置选中的数据,通常都是有一个接口获取所有选中的数据id数组[4, 5, 9]。这里仅仅是采用固定数据
    this.defaultCheckedKeys.push(...[5, 9, 12])
  },
  methods: {
    // 获取选中的数据 nodeArr：选中的节点数据， keyArr: 选中节点的key(id)值
    treeChange (checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    // 强制刷新子组件
    handleReLoad () {
      // 强制更新子组件,实际项目中应该用不到，这里只是让tree组件编辑和展示的切换
      this.reload = false
      this.$nextTick(() => (this.reload = true))
    },
    // 切换编辑和展示
    toggleShowCheckbox () {
      this.showCheckbox = !this.showCheckbox
      this.handleReLoad()
    },
    // 切换展开和收缩
    toggleDefaultExpandAll () {
      this.defaultExpandAll = !this.defaultExpandAll
      this.handleReLoad()
    },
    // 过滤器
    toggleShowFilter () {
      this.isShowFilter = !this.isShowFilter
      this.handleReLoad()
    }

  }
}
</script>
<style scoped>

</style>
