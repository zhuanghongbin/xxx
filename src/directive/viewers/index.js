import Vue from 'vue'
import Viewers from 'viewerjs'
import 'viewerjs/dist/viewer.css'
/**
 * 官方文档(github): https://github.com/fengyuanchen/viewerjs
 * 使用viewerjs:
 * import Viewers from 'viewerjs'
 * import 'viewerjs/dist/viewer.css'
 * viewerjs挂载到vue对象上 Vue.prototype.$viewers（如果需要特殊处理可以用这种方法，如果仅仅为了展示图片可以直接调用v-viewers指令）
 * eg. let newViewers = new this.$viewers(document.querySelector('#viewImage'), {
        movable: false,
        loop: true,
        scalable: false,
        navbar: true
      })
      newViewers.move(1)
 * */
// 挂载到全局vue中
Vue.prototype.$viewers = Viewers
// viewerjs图片预览挂载到 v-viewers指令上, 使用时可以添加viewers官方规则覆盖默认属性 eg. v-viewers="{navbar: false}"
let newViewers
Vue.directive('viewers', {
  bind (el, binding) {
    // console.log('bind:', el, el.parentElement, binding.value)
    /* eslint-disable no-new */
    newViewers = new Viewers(el, Object.assign({
      // inline: true, // 在指定的位置展示
      movable: false,
      loop: true,
      scalable: false,
      navbar: true
    }, binding.value))
  },
  // inserted (el, binding) {
  //   console.log('inserted:', el, el.parentElement)
  // },
  componentUpdated () { // 组件更新完成
    newViewers.update()
  }
})
