// Inspired by https://github.com/fengyuanchen/viewerjs
const Viewers = require('viewerjs')
if (!Viewers) {
  throw new Error('you should npm install `Viewers` --save-dev at first ')
}
// viewerjs图片预览挂载到 v-viewers指令上
let newViewers
export default {
  bind (el, binding) {
    console.log('bind:', el, el.parentElement, binding.value)
    /* eslint-disable no-new */
    newViewers = new Viewers(el, Object.assign({
      // inline: true, // 在指定的位置展示
      movable: false,
      loop: true,
      scalable: false,
      navbar: true
    }, binding.value))
  },
  componentUpdated () { // 组件更新完成
    newViewers.update()
  }
}
