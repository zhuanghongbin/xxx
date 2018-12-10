<template>
  <div class="app-container">
    <!-- <el-button type="primary" @click="toggleShow">{{show? '展示': '编辑'}}</el-button> -->
    <el-button type="primary" @click="linkStyle">下划线选项卡</el-button>
    <el-button type="danger" @click="cardStyle">选项卡</el-button>
    <el-button type="success" @click="borderCardStyle">卡片样式</el-button>
    <linebar status="primary"/>
    <!-- tree 组件 -->
    <tab-comp :data="tabsData" @toggleTabs="toggleTabs" :set-tab-select="tabsData[2]['name']" :type="type">
      <!-- 采用命名solt方式 -->
      <count-to :slot="tabsData[0]['name']"></count-to>
      <tree :slot="tabsData[1]['name']"></tree>
      <index :slot="tabsData[2]['name']"></index>
      <count-to :slot="tabsData[3]['name']"></count-to>
    </tab-comp>
    <tab-comp :data="tabsData2" :type="'card'"></tab-comp>
    <linebar status="primary" />
    <div>
      <p>这里获取选中的数据是点击切换的，如果想要一开始就获取选中的数据可以手动获取（tabsData的）：</p>
      <p>索引：{{tabSelect.index}}</p>
      <p>tab栏标签名：{{tabSelect.label}}</p>
      <p>tab栏映射名：{{tabSelect.name}}</p>
    </div>
  </div>
</template>
<script>
import TabComp from '@/components/Tab'
import Linebar from '@/components/Linebar'

import CountTo from './CountTo'
import Tree from './Tree'
import Index from './Index'

export default {
  name: 'Tab',
  components: {
    TabComp,
    Linebar,
    CountTo,
    Tree,
    Index
  },
  filters: {
  },
  data () {
    return {
      reload: true,
      tabsData: [
        {label: '用户管理', name: 'user', icon: 'el-icon-date'},
        {label: '配置管理', name: 'config'},
        {label: '角色管理', name: 'roler'},
        {label: '定时任务补偿', name: 'work', icon: 'el-icon-date'}
      ],
      tabsData2: [
        {label: '用户管理2', name: 'user2'},
        {label: '配置管理2', name: 'config2'},
        {label: '角色管理2', name: 'roler2'},
        {label: '定时任务补偿2', name: 'work2'}
      ],
      // 对应tab选中的值
      tabSelect: {
        index: '',
        name: '',
        label: ''
      },
      type: ''
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
    // tab栏切换，返回参数：点击索引值，标签name，整个tab对象
    toggleTabs (index, tabName, tabObj) {
      this.tabSelect.index = index
      this.tabSelect.name = tabName
      this.tabSelect.label = tabObj.label
    },
    // 强制刷新子组件
    handleReLoad () {
      // 强制更新子组件,实际项目中应该用不到，这里只是让tree组件编辑和展示的切换
      this.reload = false
      this.$nextTick(() => (this.reload = true))
    },
    // 切换编辑和展示
    toggleShow () {
      this.show = !this.show
      this.handleReLoad()
    },
    // 下划线
    linkStyle () {
      this.type = ''
    },
    // 选项卡样式
    cardStyle () {
      this.type = 'card'
    },
    // 卡片化
    borderCardStyle () {
      this.type = 'border-card'
    }
  }
}
</script>
<style scoped>
</style>
