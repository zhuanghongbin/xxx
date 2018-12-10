<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
    :type="type"
    :tab-position="tabPosition"
    :set-tab-select="setTabSelect"
    :editable="editable"
  >
    <el-tab-pane :label="item.label" :name="item.name" v-for="item in newData" :key="item.name">
      <span slot="label" v-if="item.icon"><i :class="item.icon"></i> {{item.label}}</span>
      <!-- <span slot="label" v-else>item.label</span> -->
      <slot :name="item.name"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    // 默认空是 线条样式， 卡片化: border-card  选项卡: card
    type: {
      type: String,
      default: ''
    },
    // 标签一共有四个方向的设置 tabPosition="left|right|top|bottom" 默认是'top'
    tabPosition: {
      type: String,
      default: 'top'
    },
    // 数据格式[{label: '标签名', name: '标签对应的name'},{}] ===> [{label: '用户管理', name: 'user'}, {label: '配置管理', name: 'config'}]
    data: {
      type: Array,
      default: () => {
        return [{}]
      }
    },
    // 设置
    setTabSelect: {
      type: String,
      default: ''
    },
    // 是否可以编辑
    editable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeName: this.setTabSelect || this.data[0]['name']
    }
  },
  computed: {
    newData () {
      return this.data
    }
  },
  watch: {
  },
  methods: {
    handleClick (tab, event) {
      this.$emit('toggleTabs', tab.index, tab.name, tab)
      // console.log(tab.index, tab.name, tab)
    }
  },
  created () {
  }
}
</script>
