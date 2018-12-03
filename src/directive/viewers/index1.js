import Viewers from './viewers'

const install = function (Vue) {
  Vue.directive('Viewers', Viewers)
}

if (window.Vue) {
  window.clipboard = Viewers
  Vue.use(install); // eslint-disable-line
}

Viewers.install = install
export default Viewers
