// import request from '@/utils/request'
// axios 使用application / x-www-form-urlencoded格式
// 参数里面要传数组呢，只需要在qs的方法中设置它的indices为false即可，如：
// qs.stringify({a:['b','c','d']},{indices:false});
// import qs from 'qs'

export function loginByUsername (username, password) {
  return new Promise((resolve, reject) => {
    resolve({data: {
      name: '商户管理员: 刘先生',
      roles: ['admin'],
      avatar: require('@/assets/images/admin/timg.jpg'),
      introduction: 'sssxx'
    }})
  }).then(res => {
    return res
  }).catch(() => {})
  // const data = {
  //   username,
  //   password
  // }
  // return request({
  //   url: '/login/login',
  //   method: 'post',
  //   data //data: qs.stringify(data)
  // })
}

export function logout () {
  return new Promise((resolve, reject) => {
    resolve()
  }).then(res => {
    return res
  }).catch(() => {})
  // return request({
  //   url: '/logout',
  //   method: 'post'
  // })
}

export function getUserInfo (token) {
  return new Promise((resolve, reject) => {
    resolve({data: {
      name: '商户管理员: 刘先生',
      roles: ['admin'],
      avatar: require('@/assets/images/admin/timg.jpg'),
      introduction: 'sssxx'
    }})
  }).then(res => {
    return res
  }).catch(() => {})
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function resetPassword (passwordInfo) {
  return new Promise((resolve, reject) => {
    resolve({
      msg: '请求成功'
    })
  }).then(res => {
    return res
  }).catch(() => {})
  // return request({
  //   url: '/resetpassword',
  //   method: 'post',
  // })
}
