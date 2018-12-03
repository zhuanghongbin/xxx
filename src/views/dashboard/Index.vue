<template>
  <div class="app-container">
    <!-- <breadcrumb class="breadcrumb-container"/> -->
    <p>dashboard</p>
    <br>
    <p>数值格式化:{{num}} => {{num | toThousandFilter}}</p>
    <br>
    <p>时间格式化:{{nows}} => {{dateFormat}}</p>
    <br>
    <br>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <br>
    <br>
    <el-button plain>默认按钮</el-button>
    <el-button type="primary" plain>主要按钮</el-button>
    <el-button type="success" plain>成功按钮</el-button>
    <el-button type="info" plain>信息按钮</el-button>
    <el-button type="warning" plain>警告按钮</el-button>
    <el-button type="danger" plain>危险按钮</el-button>
    <br>
    <br>
    <el-button disabled>默认按钮</el-button>
    <el-button type="primary" disabled>主要按钮</el-button>
    <el-button type="success" disabled>成功按钮</el-button>
    <el-button type="info" disabled>信息按钮</el-button>
    <el-button type="warning" disabled>警告按钮</el-button>
    <el-button type="danger" disabled>危险按钮</el-button>
    <br>
    <br>
    <p>https://github.com/ecomfe/vue-echarts/blob/master/demo/Demo.vue</p>
    <p>https://ecomfe.github.io/vue-echarts/demo/#bar</p>
    <p>https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md</p>
    <div style="height:500px;">
      <chart
        :options="line"
        :init-options="initOptions"
        ref="line"
        theme="orange"
        style="width: 100%;height:100%;"
        auto-resize
      />
    </div>
    <div style="height:500px;">
      <chart
        :options="bar"
        :init-options="initOptions"
        ref="bar"
        theme="orange"
        style="width: 100%;height:100%;"
        auto-resize
      />
    </div>
    <div style="height:500px;">
      <chart
        :options="pie"
        :init-options="initOptions"
        ref="pie"
        theme="orange"
        style="width: 100%;height:100%;"
        auto-resize
      />
    </div>
    <div style="height:500px;">
      <chart
        :options="pie2"
        :init-options="initOptions"
        ref="pie"
        theme="orange"
        style="width: 100%;height:100%;"
        auto-resize
      />
    </div>
  </div>
</template>

<script>
import {parseTime, formatTime} from '@/utils'

// 引入echart 异步更新数据更新echart 需要 resize
import qs from 'qs'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/component/tooltip' // 提示框组件
import 'echarts/lib/component/legend' // 图例组件
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import getBar from './data/bar'
import pie from './data/pie'
import pie2 from './data/pie2'
import line from './data/line'
// custom theme http://echarts.baidu.com/theme-builder/
import theme from './data/theme.json'
// registering custom theme
ECharts.registerTheme('orange', theme)
// end echart

export default {
  name: 'dashboard',
  data () {
    let options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      num: 4564615464.15,
      now: Date.now(),
      nows: '',
      dateFormat: '',
      line, // start echart
      bar: getBar(),
      pie,
      pie2,
      expand: {
        bar: true,
        pie: true
      },
      initOptions: {
        renderer: options.renderer || 'canvas'
      } // end echart
    }
  },
  mounted () {
    this.nows = parseTime(this.now)
    console.log(new Date('2018-10-27 17:14:28').getTime() / 1000, Date.now())
    this.dateFormat = formatTime(new Date('2018-11-26 17:14:28').getTime() / 1000)
  },
  components: {
    'chart': ECharts
  }
}
</script>
<style lang="scss">
.echarts {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss" scoped>
  // .dashboard-wrap{
  //   color: #000;
  // }
</style>
