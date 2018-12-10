<!--  -->
<template>
  <div class=''>
    <el-amap
      ref='gaodeMap'
      class="amap-box"
      :vid="'amap-vue'"
      :center="center"
      :amap-manager="amapManager"
      :zoom="zoom"
      :resizeEnable="resizeEnable"
      :events="events">
      <el-amap-info-window
        v-if="markWindow"
        :position="markWindow.position"
        :visible="markWindow.visible"
        :content="markWindow.content"
        :offset="markWindow.offset"
        >
      </el-amap-info-window>
      <el-amap-marker
        v-for="(item,index) in markers"
        :vid="`markers${index}`"
        :key="index"
        :visible="true"
        :position="item.position"
        :label="item.label"
        :events="item.events"
        >
      </el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
const loadPromise = lazyAMapApiLoaderInstance.load()
export default {
  components: {},
  props: {
    markerPosition: {
      type: String,
      default: ''
    },
    markerAddres: {
      type: String,
      default: ''
    },
    markerArea: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      map: null, // 地图实例
      zoom: 11,
      resizeEnable: true,
      center: [116.397428, 39.90923],
      amapManager: new AMapManager(),
      placeSearch: null,
      events: {
        // 在map上添加一个标注点
        click: (map) => {
          map.target.remove(this.clickmark)
          let marker = new AMap.Marker({
            position: [map.lnglat.lng, map.lnglat.lat]
          })
          console.log(map, 'marker')
          marker.setMap(map.target)
          this.clickmark.push(marker)
          // this.markerPosition = `${map.lnglat.lng}, ${map.lnglat.lat}`
          this.$emit('update:markerPosition', `${map.lnglat.lng}, ${map.lnglat.lat}`)
        }
      },
      markers: [], // 定义标注数组
      clickmark: [], // 点击添加的标注
      markersWindow: [], // 标注点提示信息
      markWindow: null
    }
  },
  watch: {
    markerArea (val) {
      this.getMarkerPointList(`${val}${this.markerAddres}`)
    }
  },
  methods: {
    getMarkerPointList (address) {
      // 移除自定义点击的标注点
      this.map = this.amapManager.getMap()
      this.map && this.map.remove(this.clickmark)
      // this.placeSearch = new AMap.PlaceSearch()
      // 查询所有标注点
      this.placeSearch && this.placeSearch.search(address, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          let poiArr = result.poiList.pois
          // 清空标注点和信息窗口数据
          this.markers = []
          let windows = []
          // 所有信息窗体隐藏
          this.markersWindow.forEach(item => {
            item.visible = false
          })
          // 获取地区默认标注点
          result.poiList && result.poiList.pois.forEach((item, index) => {
            // 在地图上创建标注点
            let marker = {
              position: [poiArr[index].location.lng, poiArr[index].location.lat],
              label: {
                offset: [3, 0], // 修改label相对于maker的位置
                content: String.fromCharCode(65 + index)
              },
              events: {
                // init: (map) => {
                //   AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
                //     /* eslint-disable no-new */
                //     new SimpleMarker({
                //       iconLabel: String.fromCharCode(65 + index),
                //       iconStyle: 'red',
                //       map: this.map,
                //       position: [poiArr[index].location.lng, poiArr[index].location.lat]
                //     })
                //   })
                // },
                click: () => {
                  console.log('sss')
                  this.markWindow = this.markersWindow[index]
                  this.$nextTick(() => {
                    this.markWindow.visible = true
                  })
                }
              }
            }
            windows.push({
              position: [poiArr[index].location.lng, poiArr[index].location.lat],
              content: `<h4>${poiArr[index].name}</h4><div class="text item">${poiArr[index].address}</div>`,
              offset: [0, -20],
              visible: false
            })
            // 添加标注点
            this.markers.push(marker)
            // 添加标注点信息窗口
            this.markersWindow = windows
          })
          // 设置地图显示级别及中心点(第一个点为中心点)
          this.map && this.map.setZoomAndCenter(14, new AMap.LngLat(poiArr[0].location.lng, poiArr[0].location.lat))
        }
      })
    }
  },
  mounted () {
    // 高德地图初始化
    loadPromise.then(() => {
      this.placeSearch = new AMap.PlaceSearch()
      console.log(this.markerAddres, 'ccccc')
      this.getMarkerPointList(this.markerAddres)
    })
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.amap-box{
  width: 100%;
  height: 375px;
}
</style>
