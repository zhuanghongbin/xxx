// import echarts from 'vue-echarts/components/ECharts'
export default {
  tooltip: {
    // trigger: 'item',
    // axisPointer: {
    //   type: 'cross'
    // }
    trigger: 'axis'
  },
  legend: {
    data: [{
      name: '2016 降水量',
      icon: 'circle'
    }, {
      name: '2017 降水量',
      icon: 'circle'
    }, {
      name: '2018 降水量',
      icon: 'circle'
    }]
  },
  grid: {
    top: 70,
    bottom: 50
  },
  xAxis: [{
    type: 'category',
    axisTick: {
      alignWithLabel: true
    },
    axisLine: {
      onZero: false
    },
    axisPointer: {
      // lineStyle: {
      //   color: '#004E52',
      //   opacity: 0.5,
      //   width: 2
      // },
      label: {
        formatter: function (params) {
          return '降水量  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
        }
      }
    },
    data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
  }],
  yAxis: [
    {
      type: 'value',
      splitLine: { // y轴背景栅格
        show: false
      }
    }
  ],
  series: [
    {
      name: '2016 降水量',
      type: 'line',
      smooth: true,
      symbol: 'circle', // 标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      symbolSize: 7,
      showSymbol: false, // 只有在 tooltip hover 的时候显示
      showAllSymbol: 'auto', // 如果有足够空间则显示标志图形，否则随主轴标签间隔隐藏策略 另外两个值是true 和false
      areaStyle: {
        normal: {
          opacity: 0.5
        }
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(255,255,255,1)',
          borderWidth: 3
        }
      },
      data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
    },
    {
      name: '2017 降水量',
      type: 'line',
      smooth: true,
      symbol: 'circle', // 标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      symbolSize: 7,
      showSymbol: false, // 只有在 tooltip hover 的时候显示
      showAllSymbol: 'auto', // 如果有足够空间则显示标志图形，否则随主轴标签间隔隐藏策略 另外两个值是true 和false
      areaStyle: {
        normal: {
          opacity: 0.5
        }
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(255,255,255,1)',
          borderWidth: 3
        }
      },
      data: [3.9, 4, 12.5, 11.5, 55.3, 19.5, 47.5, 154.4, 67.1, 57.5, 332.4, 0.9]
    },
    {
      name: '2018 降水量',
      type: 'line',
      smooth: true,
      symbol: 'circle', // 标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      symbolSize: 7,
      showSymbol: false, // 只有在 tooltip hover 的时候显示
      showAllSymbol: 'auto', // 如果有足够空间则显示标志图形，否则随主轴标签间隔隐藏策略 另外两个值是true 和false
      areaStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //   offset: 0,
          //   color: '#d68262'
          // }, {
          //   offset: 1,
          //   color: '#ffe'
          // }]),
          opacity: 0.5
        }
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(255,255,255,1)',
          borderWidth: 3
        }
      },
      data: [47.5, 154.4, 67.1, 57.5, 286.4, 0.9, 3.9, 4, 12.5, 11.5, 55.3, 19.5]
    }
  ]
}
